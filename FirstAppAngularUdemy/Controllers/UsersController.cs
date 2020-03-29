using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        [Route("api/Users/ListUserType")]
        public IEnumerable<UserTypeCLS> ListUserType()
        {
            using(BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from userType in bd.TipoUsuario
                        where userType.Bhabilitado == 1
                        select new UserTypeCLS
                        {
                            Description = userType.Nombre,
                            IdUserType = userType.Iidtipousuario
                        }
                    ).ToList();
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
                            UserType = userType.Nombre
                        }
                    ).ToList();
            }
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
                           UserType = userType.Nombre
                       }
                    ).ToList();
            }
        }
    }
}