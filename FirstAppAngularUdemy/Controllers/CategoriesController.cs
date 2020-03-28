using FirstAppAngularUdemy.Classes;
using FirstAppAngularUdemy.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace FirstAppAngularUdemy.Controllers
{
    public class CategoriesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Categories/CategoriesList")]
        public IEnumerable<CategoryCLS> GetCategories()
        {
            using (var bd = new BDRestauranteContext())
            {
                return (from categoria in bd.Categoria
                        where categoria.Bhabilitado == 1
                        select new CategoryCLS
                        {
                            IdCategory = categoria.Iidcategoria,
                            NameCategory = categoria.Nombre
                        }).ToList();
            }
        }
    }
}