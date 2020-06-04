﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CritterCaps.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CritterCaps.Controllers
{
    [Route("api/crittercaps")]
    [ApiController]
    public class CritterCapsController : ControllerBase
    {
        [HttpGet("products")]
        public IActionResult GetAllProducts()
        {
            var repo = new ProductRepository();
            var result = repo.GetAllProducts();
            if(!result.Any())
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

        [HttpGet("product/{productId}")]
        public IActionResult GetSingleProduct(int productId)
        {
            var repo = new ProductRepository();
            var result = repo.GetSingleProduct(productId);
            if (result == null)
            {
                return NotFound("No products available");
            }

            return Ok(result);
        }

        [HttpGet("animals")]
        public IActionResult GetAllAnimals()
        {
            var repo = new AnimalRepository();
            var result = repo.GetAllAnimals();
            if (!result.Any())
            {
                return NotFound("We don't like those animals");
            }

            return Ok(result);
        }

        [HttpGet("animal/{animalType}")]
        public IActionResult GetSingleAnimal(string animalType)
        {
            var repo = new AnimalRepository();
            var result = repo.GetSingleAnimal(animalType);
            if (result == null)
            {
                return NotFound("Your animal doesn't exist here");
            }

            return Ok(result);
        }
    }
}