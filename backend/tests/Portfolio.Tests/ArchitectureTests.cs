using System.Xml.Linq;
using Xunit;

namespace Portfolio.Tests;

public sealed class ArchitectureTests
{
    [Theory]
    [InlineData("Domain", "")]
    [InlineData("Application", "Domain")]
    [InlineData("Infrastructure", "Application,Domain")]
    [InlineData("Api", "Application,Infrastructure")]
    public void ProjectReferencesRespectBoundaries(string project, string allowedReferences)
    {
        var path = Path.Combine(FindBackendDirectory(), "src", $"Portfolio.{project}", $"Portfolio.{project}.csproj");
        var references = XDocument.Load(path).Descendants("ProjectReference")
            .Select(reference => Path.GetFileNameWithoutExtension(reference.Attribute("Include")!.Value.Replace('\\', '/')))
            .Order(StringComparer.Ordinal)
            .ToArray();
        var allowed = allowedReferences.Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(name => $"Portfolio.{name}")
            .Order(StringComparer.Ordinal)
            .ToArray();

        Assert.Equal(allowed, references);
    }

    private static string FindBackendDirectory()
    {
        for (DirectoryInfo? directory = new(AppContext.BaseDirectory);
             directory is not null;
             directory = directory.Parent)
        {
            if (File.Exists(Path.Combine(directory.FullName, "Portfolio.slnx")))
            {
                return directory.FullName;
            }
        }

        throw new DirectoryNotFoundException("Backend solution directory was not found.");
    }
}
