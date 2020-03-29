using FirstAppAngularUdemy.Classes;
using FirstAppAngularUdemy.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FirstAppAngularUdemy.Controllers
{
    public class PeopleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/People/ListPeople")]
        public IEnumerable<PersonCLS> ListPeople()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from person in bd.Persona
                       where person.Bhabilitado == 1
                       select new PersonCLS
                       {
                           //Birthday = (DateTime)person.Fechanacimiento,
                           Email = person.Correo,
                           FullName = $"{person.Nombre} {person.Appaterno} {person.Appaterno}",
                           IdPerson = person.Iidpersona,
                           PhoneNumber = person.Telefono
                       }).ToList();
            }
        }

        [HttpGet]
        [Route("api/People/FilterPerson/{name?}")]
        public IEnumerable<PersonCLS> FilterPerson(string name = "")
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return name == "" 
                    ? (from person in bd.Persona
                       where person.Bhabilitado == 1
                       select new PersonCLS
                       {
                           Birthday = (DateTime)person.Fechanacimiento,
                           Email = person.Correo,
                           FullName = $"{person.Nombre} {person.Appaterno} {person.Appaterno}",
                           IdPerson = person.Iidpersona,
                           PhoneNumber = person.Telefono
                       }).ToList()
                    : (from person in bd.Persona
                        where person.Bhabilitado == 1
                        && $"{person.Nombre} {person.Appaterno} {person.Appaterno}".ToLower().Contains(name.ToLower())
                        select new PersonCLS
                        {
                            Birthday = (DateTime)person.Fechanacimiento,
                            Email = person.Correo,
                            FullName = $"{person.Nombre} {person.Appaterno} {person.Appaterno}",
                            IdPerson = person.Iidpersona,
                            PhoneNumber = person.Telefono
                        }).ToList();
            }
        }

        [HttpPost]
        [Route("api/People/savePerson")]
        public bool savePerson([FromBody]PersonCLS oPersonCLSL)
        {
            bool response = false;

            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                Persona oPerson = new Persona
                {
                    Apmaterno = oPersonCLSL.apMaterno,
                    Appaterno = oPersonCLSL.apPaterno,
                    Iidpersona = oPersonCLSL.IdPerson,
                    Nombre = oPersonCLSL.Name,
                    Correo = oPersonCLSL.Email,
                    Telefono = oPersonCLSL.PhoneNumber,
                    Bhabilitado = 1,
                    Btieneusuario = 0
                };

                bd.Add(oPerson);

                try
                {
                    bd.SaveChanges();
                    response = true;
                }
                catch (System.Exception)
                {
                }
            }
            

            return response;
        }
    }
}