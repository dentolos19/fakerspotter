using Blazored.LocalStorage;

namespace FakerSpotter.Core
{

    public static class UserSettings
    {

        public static ISyncLocalStorageService LocalStorage { get; set; }

        public static bool IsRoomOneCompleted
        {
            get => LocalStorage.ContainKey(nameof(IsRoomOneCompleted)) && LocalStorage.GetItem<bool>(nameof(IsRoomOneCompleted));
            set => LocalStorage.SetItem(nameof(IsRoomOneCompleted), value);
        }

        public static bool IsRoomTwoCompleted
        {
            get => LocalStorage.ContainKey(nameof(IsRoomTwoCompleted)) && LocalStorage.GetItem<bool>(nameof(IsRoomTwoCompleted));
            set => LocalStorage.SetItem(nameof(IsRoomTwoCompleted), value);
        }

        public static bool IsRoomThreeCompleted
        {
            get => LocalStorage.ContainKey(nameof(IsRoomThreeCompleted)) && LocalStorage.GetItem<bool>(nameof(IsRoomThreeCompleted));
            set => LocalStorage.SetItem(nameof(IsRoomThreeCompleted), value);
        }

        public static int PointsAccumulated
        {
            get => LocalStorage.ContainKey(nameof(PointsAccumulated)) ? LocalStorage.GetItem<int>(nameof(PointsAccumulated)) : 0;
            set => LocalStorage.SetItem(nameof(PointsAccumulated), value);
        }

    }

}