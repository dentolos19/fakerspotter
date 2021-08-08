using System;
using System.Diagnostics;
using Humanizer;

namespace FakerSpotter.Core.Helpers
{

    public static class ActivityLogger
    {

        private static string CurrentTime => $"{DateTime.Now:yyyy-MM-dd @ HH:mm:ss}";

        public static void PostLine(string message, LogStatus status = LogStatus.Information)
        {
            var log = $"[{CurrentTime} * {status.Humanize()}] {message}";
            Debug.WriteLine(log);
            Console.WriteLine(log);
        }

        public static void PostChunk(string chunk)
        {
            var log = $"====> {CurrentTime} <====" + Environment.NewLine +
                          chunk + Environment.NewLine +
                          "=================================";
            Debug.WriteLine(log);
            Console.WriteLine(log);
        }

    }

}