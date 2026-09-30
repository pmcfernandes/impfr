using System.Reflection;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace ImPedro.ConventionApi;

internal sealed class ConventionControllerFeatureProvider : IApplicationFeatureProvider<ControllerFeature>
{
    private readonly IReadOnlyList<Type> _services;

    public ConventionControllerFeatureProvider(IReadOnlyList<Type> services) => _services = services;

    public void PopulateFeature(IEnumerable<ApplicationPart> parts, ControllerFeature feature)
    {
        foreach (var service in _services)
        {
            var controller = typeof(ConventionController<>).MakeGenericType(service).GetTypeInfo();
            if (!feature.Controllers.Contains(controller)) feature.Controllers.Add(controller);
        }
    }
}
