using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace ImPedro.ConventionApi;

internal sealed class ConventionControllerNameConvention : IControllerModelConvention
{
    public void Apply(ControllerModel controller)
    {
        var type = controller.ControllerType;
        if (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(ConventionController<>)) return;
        controller.ControllerName = ServiceName.For(type.GenericTypeArguments[0]);
    }
}
