Weather in Stardew Valley runs from multiple sources.

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
3|spring|1|weather_rain*
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
25|winterany|weather_festival

* The game first sets it to _sunny and then in a later check to _rain

At this point, it checks if it's rainy or storming, and sets the flags. 

If it's 0-2-4-5-6, it clears all rainy, storm or lightning tracks. (it then manually sets snowing after this..)

It then sets the debris array to active, and then it starts setting weather for the next day (!). 

In summer, the chance of rain the next day is : 0% if it's the first day, and  .13 + .003 * the day of the month
In winter, the chance of 'rain' is 63%.
In fall and spring, it's 18.3%

It then picks a number, and if it's less than the chance of rain, it sets it equal to rain. It then checks if it's summer, and rain in summer has an 85% chance of becoming storms. OR: In any month that isn't winter, as long as you've played more than 27 days and it's at least the third day of the month, you have a 25% chance of the rain becoming a storm.

In winter, rain always becomes snow.

If the number is over the chance of rain, it checks you've played for at least 2 days, and that it's not a wedding day. In spring, there is a 20% chance of wind, and in fall, a 60% chance of the weather becoming windy.

It then checks to make sure that the next day is a festival day. If so, it sets it to weather_festival. If the current day is the 2nd day of spring, it makes sure the third day is rainy. (again.) (It's sets this by making sure you've played 2 days.)

------------------------------------------------------------------------

Now, if you check the TV, it both can check the current weather or alter it. (getWeatherForceast())

The TV force sets by:

day | season | year |weather
----|--------|-------|-------
1|spring|any|weather_sunny*
1|summer|any|weather_sunny*
12|summer|any|weather_lightning
24|summer|any|weather_lightning
1|fall|any|weather_sunny*
1|winter|any|weather_sunny*

* also set (and therefore overriden) by the newDay() function

Description:
It will check the weather, and do the following:
*Sunny or Wedding: A 50% chance of one of two strings: "It's going to be clear and sunny all day." or "It's going to be a beautiful, sunny day tommorow!"
*Rain: "It's going to rain all day tomorrow"
*'Debris': Spring: "Partially cloudy with a light breeze. Expect lots of pollen!" Not Fall: "It's going to snow all day. Make sure you bundle up, folks!" and defaults with: "It's going to be cloudy, with gusts of wind throught the day."
*Storm: "Looks like a storm is approaching. Thunder and lightning is expected."
*Festival: It attempts to read the festival data, will spit out an amusing "Um... that's odd. My information sheet just says 'null'. This is embarrassing..." if it fails to read the data, other wise will read out where it is and when it is.
*Snow: A 50% chance of one of two strings: "Expect a few inches of snow tomorrow" or "Bundle up, folks. It's going to snow tomorrow!"

It returns an empty string for all other weathers. (which should be none, but.)

---------------------------------------------
Rain Totem: 

It makes sure you aren't in multiplayer and that tomorrow isn't a festival day. If so, it sets the weather for tomorrow to weather_rain. Of an interesting note, see the TV notes above. 
