using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Security.Policy;

namespace API.Controllers.Admin
{
    [ApiController]
    [Route("/api/admin/[controller]")]
    public class ContactUsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IHostEnvironment _host;
        private readonly IMapper _mapper;
        private readonly IOptionsSnapshot<PhotoSettings> _photoSettings;

        public ContactUsController(DataContext context, IHostEnvironment host, IMapper mapper, IOptionsSnapshot<PhotoSettings> photoSettings)
        {
            _context = context;
            _host = host;
            _mapper = mapper;
            _photoSettings = photoSettings;
        }

        [HttpPost]
        public async Task<ActionResult<ContactDto>> CreateContact([FromBody] SaveContactDto contactDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var contact = _mapper.Map<Contact>(contactDto);

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<ContactDto>(contact);

            return Ok(result);
            //return CreatedAtAction(nameof(GetSite), new { id = site.Id }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactDto>>> GetContactsUS()
        {
            var contactsUs = await _context.Contacts.ToListAsync();
            var result = _mapper.Map<IEnumerable<ContactDto>>(contactsUs);

            return Ok(result);
        }
    }
}
