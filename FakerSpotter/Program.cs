using Blazored.LocalStorage;
using Blazorise;
using Blazorise.Bootstrap;
using Blazorise.Icons.FontAwesome;
using FakerSpotter;
using FakerSpotter.Services;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.Add<App>("#app");

builder.Services.AddBlazoredLocalStorage();
builder.Services.AddBlazorise(options => { options.Immediate = true; }).AddBootstrapProviders().AddFontAwesomeIcons();

builder.Services.AddScoped(_ => new Random());
builder.Services.AddScoped(_ => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.AddScoped<UserService>();
builder.Services.AddSingleton<VariableService>();
builder.Services.AddSingleton<DatabaseService>();

await builder.Build().RunAsync();