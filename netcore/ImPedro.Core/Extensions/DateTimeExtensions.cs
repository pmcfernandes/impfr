using System.Globalization;

namespace ImPedro.Core.Extensions;

public static class DateTimeExtensions
{
    public static DateTime StartOfWeek(this DateTime value, DayOfWeek startOfWeek)
        => value.Date.AddDays(-((7 + value.DayOfWeek - startOfWeek) % 7));

    public static int Quarter(this DateTime value) => (value.Month + 2) / 3;

    public static DateTime StartOfQuarter(this DateTime value) => new(value.Year, (value.Quarter() - 1) * 3 + 1, 1);

    public static int WeekOfMonth(this DateTime value, CultureInfo? culture = null)
    {
        var first = new DateTime(value.Year, value.Month, 1);
        var firstDay = (culture ?? CultureInfo.CurrentCulture).DateTimeFormat.FirstDayOfWeek;
        var offset = (7 + first.DayOfWeek - firstDay) % 7;
        return ((value.Day + offset - 1) / 7) + 1;
    }

    public static DateTime AtMidnight(this DateTime value) => value.Date;

    public static bool IsWeekend(this DateTime value) => value.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;

    public static DateTime NextWeekday(this DateTime value)
    {
        var next = value.AddDays(1);
        while (next.IsWeekend()) next = next.AddDays(1);
        return next;
    }

    public static DateTime NextWeekendDay(this DateTime value)
    {
        var next = value.AddDays(1);
        while (!next.IsWeekend()) next = next.AddDays(1);
        return next;
    }

    public static DateTime FirstDayOfMonth(this DateTime value) => new(value.Year, value.Month, 1);

    public static DateTime LastDayOfMonth(this DateTime value) => value.FirstDayOfMonth().AddMonths(1).AddDays(-1);

    public static bool IsOrderedRange(DateTime? from, DateTime? to) => !from.HasValue || !to.HasValue || from <= to;

    public static IEnumerable<DateTime> DatesTo(this DateTime from, DateTime to)
    {
        if (from.Date > to.Date) yield break;
        for (var date = from.Date; date <= to.Date; date = date.AddDays(1)) yield return date;
    }

    public static long ToUnixTimeMilliseconds(this DateTime value) => new DateTimeOffset(value.ToUniversalTime()).ToUnixTimeMilliseconds();

    public static long ToUnixTimeSeconds(this DateTime value) => new DateTimeOffset(value.ToUniversalTime()).ToUnixTimeSeconds();
}
