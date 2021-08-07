using System.Threading.Tasks;

namespace FakerSpotter.Core
{

    public static class BlazorUtilities
    {

        public static async void DelayTask(int seconds)
        {
            while (seconds > 0)
            {
                seconds--;
                await Task.Delay(1000);
            }
        }
    }

}