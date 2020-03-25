using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAppAngularUdemy.Classes;
using FirstAppAngularUdemy.Models;
using Microsoft.AspNetCore.Mvc;

namespace FirstAppAngularUdemy.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Product/ProductsList")]
        public IEnumerable<ProductCLS> ProductsList()
        {
            using(BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from producto in bd.Producto
                            join categoria in bd.Categoria
                            on producto.Iidcategoria equals
                            categoria.Iidcategoria
                            where producto.Bhabilitado == 1
                            select new ProductCLS
                            {
                                IdProduct = producto.Iidproducto,
                                ProductName = producto.Nombre,
                                CategoryName = categoria.Nombre,
                                ProductPrice = (decimal) producto.Precio,
                                ProductStock = (int) producto.Stock

                            }).ToList();
            }
        }

        [HttpGet]
        [Route("api/Product/SearchProduct/{product}")]
        public IEnumerable<ProductCLS> SearchProducts(string product)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from producto in bd.Producto
                        join categoria in bd.Categoria
                        on producto.Iidcategoria equals
                        categoria.Iidcategoria
                        where producto.Nombre.ToLower().Contains(product.ToLower())
                        && producto.Bhabilitado == 1
                        select new ProductCLS
                        {
                            IdProduct = producto.Iidproducto,
                            ProductName = producto.Nombre,
                            CategoryName = categoria.Nombre,
                            ProductPrice = (decimal)producto.Precio,
                            ProductStock = (int)producto.Stock

                        }).ToList();
            }
        }
    }
}