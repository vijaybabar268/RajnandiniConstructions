using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Controllers.Admin;

[ApiController]
[Route("/api/admin/[controller]")]
public class SliderController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IHostEnvironment _host;
    private readonly IMapper _mapper;
    private readonly IOptionsSnapshot<PhotoSettings> _photoSettings;

    public SliderController(DataContext context, IHostEnvironment host, IMapper mapper, IOptionsSnapshot<PhotoSettings> photoSettings)
    {
        _context = context;
        _host = host;
        _mapper = mapper;
        _photoSettings = photoSettings;
    }

    [HttpGet]
    public async Task<IEnumerable<SlideDto>> GetSliders()
    {
        var sliders = await _context.Slides.ToListAsync();

        return _mapper.Map<IEnumerable<Slide>, IEnumerable<SlideDto>>(sliders);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SlideDto>> GetSlider(int id)
    {
        var slider = await _context.Slides.FirstOrDefaultAsync(s => s.Id == id);
        if (slider == null)
            return NotFound();

        var result = _mapper.Map<SlideDto>(slider);
        
        return Ok(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteSlider(int id)
    {
        var slider = await _context.Slides.FirstOrDefaultAsync(x=> x.Id == id);
        if (slider == null)
            return NotFound();

        _context.Slides.Remove(slider);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("toggle-slider")]
    public async Task<IActionResult> ToggleSlider(int id)
    {
        var slider = await _context.Slides.FirstOrDefaultAsync(x=> x.Id == id);
        if (slider == null)
            return NotFound();

        if (slider.IsActive)
            slider.IsActive = false;
        else 
            slider.IsActive = true;

        _context.Entry(slider).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok();
    }


    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> CreateSlider([FromForm] SlideRequestDto dto)
    {
        var validation = ValidateFile(dto.File, isRequired: true);
        if (!validation.IsValid)
            return BadRequest(validation.Error);

        var fileName = await SaveFileAsync(dto.File);

        var slider = new Slide
        {
            Title = dto.Title,
            Description = dto.Description,
            Url = fileName,
            IsActive = true
        };

        _context.Slides.Add(slider);
        await _context.SaveChangesAsync();

        return Ok(_mapper.Map<SlideDto>(slider));
    }

    [HttpPut("{id:int}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UpdateSlider(int id, [FromForm] SaveSliderDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var slider = await _context.Slides.FindAsync(id);
        if (slider == null)
            return NotFound();

        // Handle optional file
        if (dto.File != null)
        {
            var validation = ValidateFile(dto.File, isRequired: false);
            if (!validation.IsValid)
                return BadRequest(validation.Error);

            DeleteOldFile(slider.Url);

            var fileName = await SaveFileAsync(dto.File);
            slider.Url = fileName;
        }

        // Common update
        slider.Title = dto.Title;
        slider.Description = dto.Description;

        await _context.SaveChangesAsync();

        return NoContent();
    }


    private (bool IsValid, string Error) ValidateFile(IFormFile file, bool isRequired)
    {
        if (file == null)
            return isRequired ? (false, "File is required") : (true, null);

        if (file.Length == 0)
            return (false, "Empty file");

        if (file.Length > _photoSettings.Value.MaxBytes)
            return (false, "Max file size exceeded");

        if (!_photoSettings.Value.IsSupported(file.FileName))
            return (false, "Invalid file type");

        return (true, null);
    }

    private async Task<string> SaveFileAsync(IFormFile file)
    {
        var folder = Path.Combine(_host.ContentRootPath, "uploads/admin/sliders");

        if (!Directory.Exists(folder))
            Directory.CreateDirectory(folder);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var path = Path.Combine(folder, fileName);

        using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);

        return fileName;
    }

    private void DeleteOldFile(string fileName)
    {
        if (string.IsNullOrEmpty(fileName))
            return;

        var path = Path.Combine(_host.ContentRootPath, "uploads/admin/sliders", fileName);

        if (System.IO.File.Exists(path))
            System.IO.File.Delete(path);
    }

    // [HttpPost]
    // [Consumes("multipart/form-data")]
    // public async Task<IActionResult> CreateSlider([FromForm]SlideRequestDto requestDto)
    // {
    //     if (requestDto.File == null)
    //         return BadRequest("Null file");

    //     if (requestDto.File.Length == 0)
    //         return BadRequest("Empty file");

    //     if (requestDto.File.Length > _photoSettings.Value.MaxBytes)
    //         return BadRequest("Max file size exceeded");

    //     if (!_photoSettings.Value.IsSupported(requestDto.File.FileName))
    //         return BadRequest("Invalid file type");

    //     var uploadPolderPath = Path.Combine(_host.ContentRootPath, "uploads/admin/sliders");
    //     if (!Directory.Exists(uploadPolderPath))
    //         Directory.CreateDirectory(uploadPolderPath);

    //     var fileName = Guid.NewGuid().ToString() + Path.GetExtension(requestDto.File.FileName);
    //     var filePath = Path.Combine(uploadPolderPath, fileName);

    //     using (var stream = new FileStream(filePath, FileMode.Create))
    //     {
    //         await requestDto.File.CopyToAsync(stream);
    //     }

    //     var slider = new Slide
    //     {
    //         Title = requestDto.Title,
    //         Description = requestDto.Description,
    //         Url = fileName,
    //         IsActive = true
    //     };
    //     _context.Slides.Add(slider);
    //     await _context.SaveChangesAsync();

    //     return Ok(_mapper.Map<Slide, SlideDto>(slider));
    // }

    // [HttpPut("{id:int}")]
    // // [Consumes("multipart/form-data")]
    // public async Task<IActionResult> UpdateSlider(int id, [FromBody]SaveSliderDto saveSliderDto)
    // {
    //     if (!ModelState.IsValid)
    //         return BadRequest(ModelState);

    //     if (saveSliderDto.File != null)
    //     {
    //         if (saveSliderDto.File.Length == 0)
    //             return BadRequest("Empty file");

    //         if (saveSliderDto.File.Length > _photoSettings.Value.MaxBytes)
    //             return BadRequest("Max file size exceeded");

    //         if (!_photoSettings.Value.IsSupported(saveSliderDto.File.FileName))
    //             return BadRequest("Invalid file type");

    //         var uploadPolderPath = Path.Combine(_host.ContentRootPath, "uploads/admin/sliders");
    //         if (!Directory.Exists(uploadPolderPath))
    //             Directory.CreateDirectory(uploadPolderPath);

    //         var fileName = Guid.NewGuid().ToString() + Path.GetExtension(saveSliderDto.File.FileName);
    //         var filePath = Path.Combine(uploadPolderPath, fileName);

    //         using (var stream = new FileStream(filePath, FileMode.Create))
    //         {
    //             await saveSliderDto.File.CopyToAsync(stream);
    //         }

    //         var sliderInDb = await _context.Slides.FindAsync(id);
    //         // _mapper.Map(saveSliderDto, sliderInDb);
    //         sliderInDb.Title = saveSliderDto.Title;
    //         sliderInDb.Description = saveSliderDto.Description;
    //         sliderInDb.IsActive = saveSliderDto.IsActive;
    //         sliderInDb.Url = fileName;

    //         _context.Entry(sliderInDb).State = EntityState.Modified;
    //         await _context.SaveChangesAsync();
    //     }    
    //     else
    //     {
    //         var slider = await _context.Slides.FindAsync(id);
    //         if (slider == null)
    //             return NotFound();

    //         // _mapper.Map(saveSliderDto, slider);
    //         slider.Title = saveSliderDto.Title;
    //         slider.Description = saveSliderDto.Description;
    //         slider.IsActive = saveSliderDto.IsActive;
    //         slider.Url = saveSliderDto.Url;

    //         _context.Entry(slider).State = EntityState.Modified;
    //         await _context.SaveChangesAsync();
    //     }

    //     return NoContent();
    // }
}
