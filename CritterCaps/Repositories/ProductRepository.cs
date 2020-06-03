﻿using CritterCaps.Models;
using System;
using System.Collections.Generic;
using Dapper;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace CritterCaps.Repositories
{
    public class ProductRepository
    {
        string ConnectionString = "Server=localhost;Database=CritterCaps;Trusted_Connection=True;";

        public IEnumerable<Product> GetAllProducts()
        {
            var sql = @"SELECT ProductId, Title, [Description], Quantity, Price, imageUrl, inStock, Category, AnimalType
                        FROM Products
	                        JOIN ProductType
	                        ON ProductType.ProductTypeId = Products.ProductTypeId
	                        JOIN AnimalType
	                        ON AnimalType.AnimalId = Products.AnimalTypeId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var products = db.Query<Product>(sql);

                return products;
            }
        }

        public Product GetSingleProduct(int productId)
        {
            var sql = @"SELECT ProductId, Title, [Description], Quantity, Price, imageUrl, inStock, Category, AnimalType
                        FROM Products
	                        JOIN ProductType
	                        ON ProductType.ProductTypeId = Products.ProductTypeId
	                        JOIN AnimalType
	                        ON AnimalType.AnimalId = Products.AnimalTypeId
                        WHERE ProductId = @productId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var product = db.QueryFirstOrDefault<Product>(sql, new { ProductId = productId });

                return product;
            }
        }
    }
}