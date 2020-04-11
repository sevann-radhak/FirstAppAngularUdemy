using FirstAppAngularUdemy.Classes;
using FirstAppAngularUdemy.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

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
            using (BDRestauranteContext bd = new BDRestauranteContext())
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
                            ProductPrice = (decimal)producto.Precio,
                            ProductStock = (int)producto.Stock

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

        [HttpGet]
        [Route("api/Product/SearchProductsByCategory/{categoryId}")]
        public IEnumerable<ProductCLS> SearchProductsByCategory(int categoryId)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from product in bd.Producto
                        join category in bd.Categoria
                        on product.Iidcategoria equals
                        category.Iidcategoria
                        where product.Iidcategoria == categoryId
                        && product.Bhabilitado == 1
                        select new ProductCLS
                        {
                            IdProduct = product.Iidproducto,
                            ProductName = product.Nombre,
                            CategoryName = category.Nombre,
                            ProductPrice = (decimal)product.Precio,
                            ProductStock = (int)product.Stock

                        }).ToList();
            }
        }

        [HttpGet]
        [Route("api/Product/listMarks")]
        public IEnumerable<MarkCLS> listMarks()
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                return (from marca in bd.Marca
                        where marca.Bhabilitado == 1
                        select new MarkCLS
                        {
                            iidmarca = marca.Iidmarca,
                            nombre = marca.Nombre
                        }).ToList();
            }
        }

        [HttpGet]
        [Route("api/Product/getProductById/{id}")]
        public ProductCLS getProductById(int id)
        {
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                try
                {
                    return (from product in bd.Producto
                            join mark in bd.Marca
                            on product.Iidmarca equals
                            mark.Iidmarca
                            join category in bd.Categoria
                            on product.Iidcategoria equals
                            category.Iidcategoria
                            where product.Bhabilitado == 1
                            && product.Iidproducto == id
                            select new ProductCLS
                            {
                                IdProduct = product.Iidproducto,
                                ProductName = product.Nombre,
                                CategoryCLS = new CategoryCLS { IdCategory = category.Iidcategoria, NameCategory = category.Nombre },
                                MarkCLS = new MarkCLS { iidmarca = mark.Iidmarca, nombre = mark.Nombre },
                                ProductPrice = (decimal)product.Precio,
                                ProductStock = (int)product.Stock
                            }).FirstOrDefault();
                }
                catch (System.Exception)
                {
                    return null;
                }
            }
        }

        [HttpPost]
        [Route("api/Product/registerProduct")]
        public bool registerProduct([FromBody] ProductCLS productCLS)
        {
            bool response = false;
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                if (productCLS.IdProduct == 0)
                {
                    bd.Add(new Producto
                    {
                        Bhabilitado = 1,
                        Iidcategoria = productCLS.idcategoria,
                        Iidmarca = productCLS.idmarca,
                        Nombre = productCLS.ProductName,
                        Precio = productCLS.ProductPrice,
                        Stock = productCLS.ProductStock
                    });
                }
                else
                {
                    Producto oProduct = bd.Producto
                        .Where(p => p.Iidproducto == productCLS.IdProduct)
                        .FirstOrDefault();

                    oProduct.Iidcategoria = productCLS.idcategoria;
                    oProduct.Iidmarca = productCLS.idmarca;
                    oProduct.Nombre = productCLS.ProductName;
                    oProduct.Precio = productCLS.ProductPrice;
                    oProduct.Stock = productCLS.ProductStock;
                }

                try
                {
                    bd.SaveChanges();
                    response = true;
                }
                catch (System.Exception)
                {
                    return false;
                }
                return response;
            }
        }

        [HttpGet]
        [Route("api/Product/deleteProduct/{id}")]
        public bool deleteProduct(int id)
        {
            bool response = false;
            using (BDRestauranteContext bd = new BDRestauranteContext())
            {
                Producto oProduct = bd.Producto.Where(p => p.Iidproducto == id).FirstOrDefault();
                oProduct.Bhabilitado = 0;

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