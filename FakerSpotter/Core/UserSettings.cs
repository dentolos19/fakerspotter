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

        public static bool IsRoomFourCompleted
        {
            get => LocalStorage.ContainKey(nameof(IsRoomFourCompleted)) && LocalStorage.GetItem<bool>(nameof(IsRoomFourCompleted));
            set => LocalStorage.SetItem(nameof(IsRoomFourCompleted), value);
        }

        public static bool IsRoomFiveCompleted
        {
            get => LocalStorage.ContainKey(nameof(IsRoomFiveCompleted)) && LocalStorage.GetItem<bool>(nameof(IsRoomFiveCompleted));
            set => LocalStorage.SetItem(nameof(IsRoomFiveCompleted), value);
        }

        public static int PointsAccumulated
        {
            get => LocalStorage.ContainKey(nameof(PointsAccumulated)) ? LocalStorage.GetItem<int>(nameof(PointsAccumulated)) : 0;
            set => LocalStorage.SetItem(nameof(PointsAccumulated), value);
        }

    }

}