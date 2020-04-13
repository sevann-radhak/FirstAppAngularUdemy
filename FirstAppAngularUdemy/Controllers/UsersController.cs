using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using FirstAppAngularUdemy.Classes;
using FirstAppAngularUdemy.Models;
using Microsoft.AspNetCore.Mvc;

namespace FirstAppAngularUdemy.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Users/FilterUserByUserType/{userTypeValue?}")]
        public IEnumerable<UserCLS> FilterUserByUserType(int userTypeValue = 0)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from user in bd.Usuario
                        join person in bd.Persona
                        on user.Iidpersona equals person.Iidpersona
                        join userType in bd.TipoUsuario
                        on user.Iidtipousuario equals userType.Iidtipousuario
                        where user.Iidtipousuario == userTypeValue
                        && user.Bhabilitado == 1
                        select new UserCLS
                        {
                            IdUser = user.Iidusuario,
                            NamePerson = $"{person.Nombre} {person.Appaterno} {person.Apmaterno}",
                            NameUser = user.Nombreusuario,
                            UserType = new UserTypeCLS
                            {
                                Description = userType.Descripcion,
                                IdUserType = userType.Iidtipousuario
                            }
                        }
                    ).ToList();
            }
        }

        [HttpGet]
        [Route("api/Users/getUser/{id}")]
        public UserCLS getUser(int id)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from user in bd.Usuario
                        join person in bd.Persona
                        on user.Iidpersona equals person.Iidpersona
                        join userType in bd.TipoUsuario
                        on user.Iidtipousuario equals userType.Iidtipousuario
                        where user.Bhabilitado == 1
                        && user.Iidusuario == id
                        select new UserCLS
                        {
                            IdUser = user.Iidusuario,
                            NameUser = user.Nombreusuario,
                            Person = new PersonCLS
                            {
                                FullName = $"{person.Nombre} {person.Appaterno} {person.Apmaterno}",
                                IdPerson = person.Iidpersona,
                                Email = person.Correo,
                                apMaterno = person.Apmaterno,
                                apPaterno = person.Appaterno,
                                Birthday = person.Fechanacimiento,
                                Name = person.Nombre,
                                PhoneNumber = person.Nombre
                            },
                            UserType = new UserTypeCLS
                            {
                                Description = userType.Descripcion,
                                IdUserType = userType.Iidtipousuario
                            }
                        }
                    ).FirstOrDefault();
            }
        }

        [HttpGet]
        [Route("api/Users/ListUser")]
        public IEnumerable<UserCLS> ListUser()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from user in bd.Usuario
                        join person in bd.Persona
                        on user.Iidpersona equals person.Iidpersona
                        join userType in bd.TipoUsuario
                        on user.Iidtipousuario equals userType.Iidtipousuario
                        where user.Bhabilitado == 1
                        select new UserCLS
                        {
                            IdUser = user.Iidusuario,
                            NamePerson = $"{person.Nombre} {person.Appaterno} {person.Apmaterno}",
                            NameUser = user.Nombreusuario,
                            UserType = new UserTypeCLS
                            {
                                Description = userType.Descripcion, 
                                IdUserType = userType.Iidtipousuario,
                                Name = userType.Nombre
                            }
                        }
                    ).ToList();
            }
        }

        [HttpGet]
        [Route("api/Users/ListUserType")]
        public IEnumerable<UserTypeCLS> ListUserType()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from userType in bd.TipoUsuario
                        where userType.Bhabilitado == 1
                        orderby userType.Descripcion
                        select new UserTypeCLS
                        {
                            Description = userType.Nombre,
                            IdUserType = userType.Iidtipousuario
                        }
                    ).ToList();
            }
        }

        [HttpPost]
        [Route("api/Users/login")]
        public int login([FromBody]UserCLS userCLS)
        {
            using(BDRestauranteContext bd = new BDRestauranteContext())
            {
                SHA256Managed sha = new SHA256Managed();
                byte[] dataPure = Encoding.Default.GetBytes(userCLS.Password);
                byte[] encryptedData = sha.ComputeHash(dataPure);
                string psswEncrypted = BitConverter.ToString(encryptedData).Replace("-", "");

                return bd.Usuario.Where(u => u.Nombreusuario.ToLower() == userCLS.NameUser.ToLower() && u.Contra == psswEncrypted).Count();
            }
        }

        [HttpPost]
        [Route("api/Users/saveData")]
        public int saveData([FromBody]UserCLS userCLS)
        {
            int response = 0;
            //try
            //{
            //    using (BDRestauranteContext bd = new BDRestauranteContext())
            //    {
            //        using( var transaction = new TransactionScope())
            //        {
            //            if (userCLS.IdUser == 0)
            //            {
            //                // Cifrar contraseña password
            //                SHA256Managed sha = new SHA256Managed();
            //                //string pssw = userCLS.Password;
            //                byte[] dataPure = Encoding.Default.GetBytes(userCLS.Password);
            //                byte[] encryptedData = sha.ComputeHash(dataPure);
            //                string psswEncrypted = BitConverter.ToString(encryptedData).Replace("-", "");

            //                Usuario user = new Usuario
            //                {
            //                    Bhabilitado = 1,
            //                    Nombreusuario = userCLS.NameUser,
            //                    Contra = psswEncrypted,
            //                    Iidpersona = userCLS.Person.IdPerson,
            //                    Iidtipousuario = userCLS.UserType.IdUserType
            //                };

            //                bd.Usuario.Add(user);

            //                // Modify person
            //                Persona person = bd.Persona.Where(p => p.Iidpersona == user.Iidpersona).FirstOrDefault();
            //                person.Btieneusuario = 1;

            //                bd.SaveChanges();
            //                transaction.Complete();
            //                response = 1;
            //            }
            //            else
            //            {
            //                Usuario user = bd.Usuario.Where(u => u.Iidusuario == userCLS.IdUser).FirstOrDefault();
            //                user.Nombreusuario = userCLS.NameUser;
            //                user.Iidtipousuario = userCLS.UserType.IdUserType;

            //                bd.SaveChanges();
            //                transaction.Complete();
            //                response = 1;
            //            }
            //        }
            //    }
            //}
            //catch (Exception)
            //{

            //    throw;
            //}

            return response;
        }

        [HttpGet]
        [Route("api/Users/validateUserExsts/{idUser}/{name}")]
        public int validateUserExsts(int idUser, string name)
        {
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    return idUser == 0
                    ? bd.Usuario.Where(u => u.Nombreusuario.ToLower() == name.ToLower()).Count()
                    : bd.Usuario.Where(u => u.Nombreusuario.ToLower() == name.ToLower() && u.Iidusuario != idUser).Count();
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}