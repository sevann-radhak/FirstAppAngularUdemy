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
                            Birthday = (DateTime)person.Fechanacimiento,
                            Email = person.Correo,
                            FullName = $"{person.Nombre} {person.Appaterno} {person.Apmaterno}",
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
        public bool savePerson([FromBody]PersonCLS oPersonCLS)
        {
            bool response = false;
            try
            {
                using (BDRestauranteContext bd = new BDRestauranteContext())
                {
                    if(oPersonCLS.IdPerson == 0)
                    { 
                        Persona oPerson = new Persona
                        {
                            Apmaterno = oPersonCLS.apMaterno,
                            Appaterno = oPersonCLS.apPaterno,
                            Iidpersona = oPersonCLS.IdPerson,
                            Nombre = oPersonCLS.Name,
                            Correo = oPersonCLS.Email,
                            Telefono = oPersonCLS.PhoneNumber,
                            Fechanacimiento = oPersonCLS.Birthday,
                            Bhabilitado = 1,
                            Btieneusuario = 0
                        };

                        bd.Add(oPerson);
                    }
                    else
                    {
                        Persona oPerson = bd.Persona.Where(p => p.Iidpersona == oPersonCLS.IdPerson).FirstOrDefault();
                        oPerson.Nombre = oPersonCLS.Name;
                        oPerson.Telefono = oPersonCLS.PhoneNumber;
                        oPerson.Correo = oPersonCLS.Email;
                        oPerson.Appaterno = oPersonCLS.apPaterno;
                        oPerson.Apmaterno = oPersonCLS.apMaterno;
                        oPerson.Fechanacimiento = oPersonCLS.Birthday;
                    }
                    
                    bd.SaveChanges();                    
                    response = true;
                }
            }
            catch (System.Exception)
            {
            }

            return response;
        }

        [HttpGet]
        [Route("api/People/getPerson/{id}")]
        public PersonCLS getPerson(int id)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from person in bd.Persona
                        where person.Iidpersona == id
                        select new PersonCLS
                        {
                            apMaterno = person.Apmaterno,
                            apPaterno = person.Appaterno,
                            Birthday = person.Fechanacimiento,
                            IdPerson = person.Iidpersona,
                            Email = person.Correo,
                            Name = person.Nombre,
                            PhoneNumber = person.Telefono,
                            BirthdayString = person.Fechanacimiento != null ? ((DateTime)person.Fechanacimiento).ToString("yyyy-MM-dd") : null
                        }).FirstOrDefault();
            }
        }

        [HttpGet]
        [Route("api/People/deletePerson/{id}")]
        public bool deletePerson(int id)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                var response = false;
                Persona oPerson = bd.Persona.Where(p => p.Iidpersona == id).FirstOrDefault();
                oPerson.Bhabilitado = 0;
                try
                {
                    bd.SaveChanges();
                    response = true;
                }
                catch (Exception)
                {
                    throw;
                }

                return response;
            }
        }
    }
}