---
layout: default
title: weather
---

Weather in Stardew Valley runs from multiple sources.

## Coding Explanation
First off, weather (for tomorrow) is controlled by the variable weatherForTomorrow. It's an _int_, and takes one of the following arguments

weather | value
------------ | -------------
weather_sunny | 0
weather_rain | 1
weather_debris | 2
weather_lightning | 3
weather_festival | 4
weather_snow | 5
weather_wedding | 6

The weather debris for the season differs (weather_debris), and is offset _16_ in spring, _24_ in summer, _18_ in fall, and nothing in winter. It failsafes to _20_.

prepareSpouseForWedding() sets the weather to wedding. 

The meat of this is in newDayAfterFade()

First, for weather, it checks if the wedding is today. It sets it to 6 if it is.

On the following days, you get the following weather by force: 

day | season | year |weather
----|--------|-------|-------
1|spring|any|weather_sunny
2|spring|1|weather_sunny
3|spring|1|weather_rain[1]
4|spring|1|weather_sunny
13|spring|any|weather_festival
24|spring|any|weather_festival
1|summer|any|weather_sunny
11|summer|any|weather_festival
13|summer|any|weather_lightning
26|summer|any|weather_lightning
28|summer|any|weather_festival
1|fall|any|weather_sunny
16|fall|any|weather_festival
27|fall|any|weather_festival
1|winter|any|weather_festival
8|winter|any|weather_festival
25|winter|any|weather_festival

[1] The game first sets it to weather_sunny and then in a later check to weather_rain

At this point, it checks if it's rainy or storming, and sets the flags. 

If it's 0-2-4-5-6, it clears all rainy, storm or lightning tracks. (it then manually sets snowing after this..)

It then sets the debris array to active, and then it starts setting weather for the next day (!). 

In summer, the chance of rain the next day is : 0% if it's the first day, and  .13 + .003 * the day of the month
In winter, the chance of 'rain' is 63%.
In fall and spring, it's 18.3%

It then picks a number, and if it's less than the chance of rain, it sets it equal to rain. It then checks if it's summer, and rain in summer has an 85% chance of becoming storms. OR: In any month that isn't winter, as long as you've played more than 27 days and it's at least the third day of the month, you have a 25% chance of the rain becoming a storm.

In winter, rain always becomes snow.

If the number is over the chance of rain, it checks you've played for at least 2 days, and that it's not a wedding day. In spring, there is a 20% chance of wind, and in fall, a 60% chance of the weather becoming windy.

Then, it finally sets the weather to sunny

It then checks to make sure that the next day is a festival day. If so, it sets it to weather_festival. If the current day is the 2nd day of spring, it makes sure the third day is rainy. (again.) (It's sets this by making sure you've played 2 days.)

## TV channel

Now, if you check the TV, it both can check the current weather or alter it. (getWeatherForceast())

The TV force sets by:

day | season | year |weather
----|--------|-------|-------
1|spring|any|weather_sunny[1]
1|summer|any|weather_sunny[1]
12|summer|any|weather_lightning
24|summer|any|weather_lightning
1|fall|any|weather_sunny[1]
1|winter|any|weather_sunny[1]

[1] also set (and therefore overriden) by the newDay() function

Description:

It will check the weather, and do the following:

* Sunny or Wedding: A 50% chance of one of two strings: "It's going to be clear and sunny all day." or "It's going to be a beautiful, sunny day tommorow!"
* Rain: "It's going to rain all day tomorrow"
* Debris: Spring: "Partially cloudy with a light breeze. Expect lots of pollen!" Not Fall: "It's going to snow all day. Make sure you bundle up, folks!" and defaults with: "It's going to be cloudy, with gusts of wind throught the day."
* Storm: "Looks like a storm is approaching. Thunder and lightning is expected."
* Festival: It attempts to read the festival data, will spit out an amusing "Um... that's odd. My information sheet just says 'null'. This is embarrassing..." if it fails to read the data, other wise will read out where it is and when it is.
* Snow: A 50% chance of one of two strings: "Expect a few inches of snow tomorrow" or "Bundle up, folks. It's going to snow tomorrow!"

It returns an empty string for all other weathers. (which should be none, but.)

### Notes:

The TV will not neccesarilly be accurate for Summer 13,26 or Spring 2,4. Those are force set within the newDayAfterFade() function.

## Rain Totem: 

It makes sure you aren't in multiplayer and that tomorrow isn't a festival day. If so, it sets the weather for tomorrow to weather_rain. Of an interesting note, see the TV notes above. 

===========================================

Now that we've broken down the flow, here's a (long winded) breakdown of each weather's chances.

## Sunny Weather (0,4,6)

In _Spring_, there is first an 18.3% base chance that it rains assuming that it's not overriden. (81.7% chance remaining for other weathers). If it doesn't rain, it has an 80% chance to remain sunny. (except on Spring 3, which will always be rainy.). This means in _Spring_, there is a 66.4% chance of it being sunny.

In _Summer_, there is a diminishing chance daily of sunny weather, but generally, you have a 86% chance on the second day, to 79.9% chance on the last day. The precise chance is: 1 - [13% + (.3 * day of the month)] per day, and it's a 0% chance on day 1. Bear in mind that Summer 12,13,24 and 26 will be stormy.

In _Fall_, the odds are precisely the same as Spring. There's no forced weather though.

In _Winter_, there is a 63% chance of preciptation, so only a 37% chance of sunny weather.

## Rainy Weather (1)

In _Spring_, you have a 18.3% chance of rain. If it rains, there's only a 25% chance of storms, _as long as it is not Year 1_. So the rain odds in Spring is a flat 18.3% in Year 1, and 13.725% in Year 2 and beyond. It will be rainy on Spring 3 Year 1.

In _Summer_, you have a steadily increasing chance of rain starting at 14% on Summer 2 to a 21.1% chance on Summer 27. However, during _Summer_, you have a 85% chance to make the rain into storms. So you have a scale of [13% + (.3 * day of the month)] * .85 to determine your chances of rainfall. (See the note about forced weather above.)

In _Fall_, it's the same as _Spring_, although Fall Year 1 can be stormy, so it's 13.725%. 

In _Winter_, it does not rain.

## Debris Weather (2)

In _Spring_, you have a 20% chance for this after rain, so approximately 16.6% chance of debris weather.

In _Summer_ you cannot have debris weather.

In _Fall_, you have a 60% chance for this after rain, so approximately 49.8% chance of debris weather.

In _Winter_ you cannot have debris weather.

## Stormy Weather (3)

In _Spring_, you have a 4.57% of storms.

In _Summer_, you have a variable chance of storms. It starts at 11.9% and increases to 17.9% chance.

In _Fall_, you have a 4.57% of storms.

In _Winter_ you cannot have stormy weather.

## Snowy Weather

In _Winter_, you have a 63% chance of snow.

No other season has snow.

# Override Table 

day | season | year |weather|overriden by
----|--------|-------|-------|--------
1|spring|any|weather_sunny|newday and tv
2|spring|1|weather_sunny|newday
3|spring|1|weather_rain|newday
4|spring|1|weather_sunny|newday
13|spring|any|weather_festival|newday
24|spring|any|weather_festival|newday
1|summer|any|weather_sunny|newday and tv
11|summer|any|weather_festival|newday
12|summer|any|weather_lightning|tv
13|summer|any|weather_lightning|newday
24|summer|any|weather_lightning|tv
26|summer|any|weather_lightning|newday
28|summer|any|weather_festival|newday
1|fall|any|weather_sunny|newday and tv
16|fall|any|weather_festival|newday
27|fall|any|weather_festival|newday
1|winter|any|weather_festival|newday and tv
8|winter|any|weather_festival|newday
25|winterany|weather_festival|newday

# Comments (Modding)

Q. How do I fix the TV not being accurate, or add new strings?

A. Override the function that does forecasts. Very difficult, although theoretically possible in SMAPI (and probably more fully in FarmHand)

Q. I want to set snowy weather outside Winter!

A. You can, as long as you keep in mind what will try to override that.

Q. What about adding new weathers?

A. Err.. Outside the scope of this, I'm afraid

Q. I see that debris has code for winter but cannot be triggered

A. Correct. It's also got an offset of 0, so you might have to do something about drawing the debris.

Q. Any modding limitations?

A. _Yes_. Bear in mind that SMAPI's PlayerEvents.LoadedGame and TimeEvents.DayOfMonthChanged run before SDV runs it's new day. The overrides and festival days will override your weather. That said, you can get snow and windy weather out of season.
