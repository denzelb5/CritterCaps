﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CritterCaps.Models;
using CritterCaps.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CritterCaps.Controllers
{
    [Route("api/crittercaps/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        ProductRepository _productRepository;

        public ProductsController(ProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        //Get All Products
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var result = _productRepository.GetAllProducts();
            if (!result.Any())
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

        //Get a single product
        [HttpGet("product/{productId}")]
        public IActionResult GetSingleProduct(int productId)
        {
            var result = _productRepository.GetSingleProduct(productId);
            if (result == null)
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

        //Update single product
        [HttpPut("product/{productId}/edit")]
        public IActionResult UpdateSingleProduct(int productId, ProductDBInfo updatedProduct)
        {
            var newProduct = _productRepository.UpdateSingleProduct(productId, updatedProduct);
            return Ok(newProduct);
        }

        //Add product
        [HttpPost()]
        public IActionResult AddProduct(ProductDBInfo productToAdd)
        {
            var result = _productRepository.AddProduct(productToAdd);
            return Ok(result);
        }


        //Get top20 newest products
        [HttpGet("newest")]
        public IActionResult GetTop20NewestProducts()
        {
            var result = _productRepository.GetTop20NewestProducts();
            if (!result.Any())
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

        [HttpGet("available")]
        public IActionResult GetAllAvailableProducts()
        {
            var results = _productRepository.GetAllAvailableProducts();

            if(results == null)
            {
                return NotFound("Product is not available.");
            }

            return Ok(results);
        }

        [HttpGet("categoryTotals")]
        public IActionResult GetTotalInventoryByCategory()
        {
            var results = _productRepository.TotalInventoryByCategory();

            if(results == null)
            {
                return NotFound("No products within the category");
            }

            return Ok(results);
        }

        [HttpGet("sales/itemTotal")]
        public IActionResult GetSalesForEachItem()
        {
            var totalSales = _productRepository.GetTotalSalesForEachItem();

            if (totalSales == null)
            {
                return NotFound("No sales for this item");
            }

            return Ok(totalSales);
        }
    }
}
