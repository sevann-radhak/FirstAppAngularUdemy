using FirstAppAngularUdemy.Classes;
using FirstAppAngularUdemy.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace FirstAppAngularUdemy.Controllers
{
    public class UserTypesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/UserTypes/DeleteUserType/{idUserType}")]
        public int DeleteUserType(int idUserType)
        {
            int response = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(tu => tu.Iidtipousuario == idUserType).FirstOrDefault();
                    oTipoUsuario.Bhabilitado = 0;
                    bd.SaveChanges();

                    response = 1;
                }
            }
            catch (Exception)
            {
            }

            return response;
        }

        [HttpGet]
        [Route("api/UserTypes/ListUserType")]
        public List<UserTypeCLS> ListUserType()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from userType in bd.TipoUsuario
                        where userType.Bhabilitado == 1
                        select new UserTypeCLS
                        {
                            bhabilitado = (int)userType.Bhabilitado,
                            descripcion = userType.Descripcion,
                            Description = userType.Descripcion,
                            Name = userType.Nombre,
                            IdUserType = userType.Iidtipousuario
                        }).ToList();
            }
        }

        [HttpGet]
        [Route("api/UserTypes/ListUserTypePages")]
        public List<PageCLS> ListUserTypePages()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from page in bd.Pagina
                        where page.Bhabilitado == 1
                        select new PageCLS
                        {
                            accion = page.Accion,
                            bhabilitado = (int)page.Bhabilitado,
                            iidpagina = page.Iidpagina,
                            mensaje = page.Mensaje
                        }).ToList();
            }
        }

        [HttpGet]
        [Route("api/UserTypes/ListPagesRecover/{idUserType}")]
        public UserTypeCLS ListPagesRecover(int idUserType)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                List<PageCLS> listPageCLS = (from userType in bd.TipoUsuario
                                             join pageUserType in bd.PaginaTipoUsuario
                                             on userType.Iidtipousuario equals pageUserType.Iidtipousuario
                                             join page in bd.Pagina
                                             on pageUserType.Iidpagina equals page.Iidpagina
                                             where pageUserType.Iidtipousuario == idUserType
                                             && pageUserType.Bhabilitado == 1
                                             select new PageCLS
                                             {
                                                 iidpagina = page.Iidpagina
                                             }
                                             ).ToList();

                TipoUsuario oTipoUsuario = bd.TipoUsuario.Where(ut => ut.Iidtipousuario == idUserType).FirstOrDefault();

                return new UserTypeCLS()
                {
                    IdUserType = oTipoUsuario.Iidtipousuario,
                    Name = oTipoUsuario.Nombre,
                    Description = oTipoUsuario.Descripcion,
                    descripcion = oTipoUsuario.Descripcion,
                    listPageCLS = listPageCLS
                };
            }
        }

        [HttpPost]
        [Route("api/UserTypes/SaveData")]
        public int SaveData([FromBody]UserTypeCLS userTypeCLS)
        {
            int response = 0;

            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    using (TransactionScope transaction = new TransactionScope())
                    {
                        if (userTypeCLS.IdUserType == 0)
                        {
                            TipoUsuario tipoUsuario = new TipoUsuario
                            {
                                Nombre = userTypeCLS.Name,
                                Bhabilitado = 1,
                                Descripcion = userTypeCLS.Description
                            };

                            bd.TipoUsuario.Add(tipoUsuario);

                            int idTipoUsuario = tipoUsuario.Iidtipousuario;
                            string[] values = userTypeCLS.values.Split("$");

                            // Pendiente refactorizar por un select
                            for (int i = 0; i < values.Length; i++)
                            {
                                PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario
                                {
                                    Iidpagina = int.Parse(values[i]),
                                    Iidtipousuario = idTipoUsuario,
                                    Bhabilitado = 1
                                };

                                bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                            }

                            bd.SaveChanges();
                            transaction.Complete();
                            response = 1;
                        }
                        else
                        {
                            TipoUsuario tipoUsuario = bd.TipoUsuario
                                .Where(tu => tu.Iidtipousuario == userTypeCLS.IdUserType).FirstOrDefault();
                            tipoUsuario.Nombre = userTypeCLS.Name;
                            tipoUsuario.Descripcion = userTypeCLS.descripcion;

                            bd.SaveChanges();

                            string[] values = userTypeCLS.values.Split("$");
                            List<PaginaTipoUsuario> list = bd.PaginaTipoUsuario
                                .Where(ptu => ptu.Iidtipousuario == userTypeCLS.IdUserType).ToList();

                            list.Select(l => l.Bhabilitado = 0);

                            // copiado tal cual como el profe
                            int cantidad;
                            for (int i = 0; i < values.Length; i++)
                            {
                                cantidad = list.Where(p => p.Iidpagina == int.Parse(values[i])).Count();
                                if (cantidad == 0)
                                {
                                    PaginaTipoUsuario oPaginaTipoUsuario = new PaginaTipoUsuario
                                    {
                                        Iidpagina = int.Parse(values[i]),
                                        Iidtipousuario = userTypeCLS.IdUserType,
                                        Bhabilitado = 1
                                    };

                                    bd.PaginaTipoUsuario.Add(oPaginaTipoUsuario);
                                }
                                else
                                {
                                    PaginaTipoUsuario oP = list.Where(p => p.Iidpagina == int.Parse(values[i])).FirstOrDefault();
                                    oP.Bhabilitado = 1;
                                }
                            }

                            bd.SaveChanges();
                            transaction.Complete();
                            response = 1;
                        }
                    }
                }
            }
            catch (Exception)
            {
            }

            return response;
        }
    }
}