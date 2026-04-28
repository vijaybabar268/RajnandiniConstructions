using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Controllers.Admin;

[ApiController]
[Route("/api/admin/sites/{siteId}/photos")]
public class PhotosController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IHostEnvironment _host;
    private readonly IMapper _mapper;
    private readonly IOptionsSnapshot<PhotoSettings> _photoSettings;

    public PhotosController(DataContext context, IHostEnvironment host, IMapper mapper, 
        IOptionsSnapshot<PhotoSettings> photoSettings)
    {
        _context = context;
        _host = host;
        _mapper = mapper;
        _photoSettings = photoSettings;
    }

    [HttpGet]
    public async Task<IEnumerable<PhotoDto>> GetPhotos(int siteId)
    {
        var photos = await _context.Photos
            .Where(p => p.SiteId == siteId).ToListAsync();

        return _mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoDto>>(photos);
    }

    [HttpPost]
    public async Task<IActionResult> Upload(int siteId, IFormFile file)
    {
        var site = await _context.Sites.FindAsync(siteId);
        if (site == null)
            return NotFound();

        if (file == null)
            return BadRequest("Null file");

        if (file.Length == 0)
            return BadRequest("Empty file");

        if (file.Length > _photoSettings.Value.MaxBytes)
            return BadRequest("Max file size exceeded");

        if (!_photoSettings.Value.IsSupported(file.FileName))
            return BadRequest("Invalid file type");

        var uploadPolderPath = Path.Combine(_host.ContentRootPath, "uploads/admin");
        if (!Directory.Exists(uploadPolderPath))
            Directory.CreateDirectory(uploadPolderPath);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadPolderPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var photo = new Photo { FileName = fileName };
        site.Photos.Add(photo);
        await _context.SaveChangesAsync();

        return Ok(_mapper.Map<Photo, PhotoDto>(photo));
    }
}
