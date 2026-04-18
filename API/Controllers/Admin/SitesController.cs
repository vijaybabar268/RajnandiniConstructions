using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Admin;

[ApiController]
[Route("/api/admin/[controller]")]
public class SitesController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public SitesController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SiteDto>>> GetSites()
    {
        var sites = await _context.Sites.Include(s => s.Status).ToListAsync();
        var result = _mapper.Map<IEnumerable<SiteDto>>(sites);

        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SiteDto>> GetSite(int id)
    {
        var site = await _context.Sites.Include(s => s.Status).FirstOrDefaultAsync(s => s.Id == id);
        if (site == null)
            return NotFound();

        var result = _mapper.Map<SiteDto>(site);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<SiteDto>> CreateSite([FromBody]SaveSiteDto siteDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var site = _mapper.Map<Site>(siteDto);

        _context.Sites.Add(site);
        await _context.SaveChangesAsync();

        var result = _mapper.Map<SiteDto>(site);

        return CreatedAtAction(nameof(GetSite), new { id = site.Id }, result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateSite(int id, [FromBody]SaveSiteDto siteDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var site = await _context.Sites.FindAsync(id);
        if (site == null)
            return NotFound();

        _mapper.Map(siteDto, site);

        _context.Sites.Update(site);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteSite(int id)
    {
        var site = await _context.Sites.FindAsync(id);
        if (site == null)
            return NotFound();

        _context.Sites.Remove(site);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

