using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Portfolio.Tests;

public sealed class HealthTests(WebApplicationFactory<Program> factory)
    : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async Task HealthReturnsHealthyWithoutExternalServices()
    {
        using var client = factory.CreateClient();
        using var response = await client.GetAsync("/health");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("Healthy", await response.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task UnknownRouteReturnsNotFound()
    {
        using var client = factory.CreateClient();
        using var response = await client.GetAsync("/unknown");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
