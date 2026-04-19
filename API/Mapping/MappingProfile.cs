using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Site to SaveSiteDto and back
        CreateMap<Site, SaveSiteDto>();
        CreateMap<SaveSiteDto, Site>()
            .ForMember(d => d.Status, o => o.Ignore());

        CreateMap<Status, StatusDto>();

        // DTOs to Domains
        CreateMap<Site, SiteDto>().ReverseMap();
    }

}
