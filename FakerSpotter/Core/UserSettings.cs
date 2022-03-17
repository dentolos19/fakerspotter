using System.Runtime.CompilerServices;
using Blazored.LocalStorage;

namespace FakerSpotter.Core;

public static class UserSettings
{

    public static ISyncLocalStorageService LocalStorage { get; set; }

    public static bool IsRoomOneCompleted
    {
        get => GetValue<bool>();
        set => SetValue(value);
    }

    public static bool IsRoomTwoCompleted
    {
        get => GetValue<bool>();
        set => SetValue(value);
    }

    public static bool IsRoomThreeCompleted
    {
        get => GetValue<bool>();
        set => SetValue(value);
    }

    public static int PointsAccumulated
    {
        get => GetValue<int>();
        set => SetValue(value);
    }

    private static T GetValue<T>(T defaultValue = default!, [CallerMemberName] string? name = null)
    {
        return LocalStorage.ContainKey(name) ? LocalStorage.GetItem<T>(name) : defaultValue;
    }

    private static void SetValue<T>(T value, [CallerMemberName] string? name = null)
    {
        LocalStorage.SetItem(name, value);
    }

}