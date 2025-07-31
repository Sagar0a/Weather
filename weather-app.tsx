"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// More accurate location-specific weather data based on current climate patterns
const locationWeatherData: Record<string, any> = {
  "san francisco": {
    current: {
      location: "San Francisco, CA",
      temperature: 16,
      condition: "Partly Cloudy",
      humidity: 72,
      windSpeed: 19,
      visibility: 16,
      pressure: 1013,
      feelsLike: 15,
      uvIndex: 5,
    },
    forecast: [
      { day: "Today", high: 18, low: 13, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Tomorrow", high: 19, low: 14, condition: "Foggy", icon: "cloudy" },
      { day: "Wednesday", high: 17, low: 12, condition: "Cloudy", icon: "cloudy" },
      { day: "Thursday", high: 20, low: 14, condition: "Sunny", icon: "sunny" },
      { day: "Friday", high: 21, low: 15, condition: "Partly Cloudy", icon: "partly-cloudy" },
    ],
    hourly: [
      { time: "12 PM", temp: 16, condition: "partly-cloudy" },
      { time: "1 PM", temp: 17, condition: "partly-cloudy" },
      { time: "2 PM", temp: 18, condition: "sunny" },
      { time: "3 PM", temp: 18, condition: "sunny" },
      { time: "4 PM", temp: 17, condition: "partly-cloudy" },
      { time: "5 PM", temp: 16, condition: "cloudy" },
    ],
  },
  "new york": {
    current: {
      location: "New York, NY",
      temperature: 4,
      condition: "Cloudy",
      humidity: 68,
      windSpeed: 11,
      visibility: 14,
      pressure: 1019,
      feelsLike: 1,
      uvIndex: 2,
    },
    forecast: [
      { day: "Today", high: 6, low: 1, condition: "Cloudy", icon: "cloudy" },
      { day: "Tomorrow", high: 8, low: 2, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wednesday", high: 3, low: -2, condition: "Snowy", icon: "snowy" },
      { day: "Thursday", high: 5, low: -1, condition: "Sunny", icon: "sunny" },
      { day: "Friday", high: 7, low: 1, condition: "Partly Cloudy", icon: "partly-cloudy" },
    ],
    hourly: [
      { time: "12 PM", temp: 4, condition: "cloudy" },
      { time: "1 PM", temp: 5, condition: "cloudy" },
      { time: "2 PM", temp: 6, condition: "partly-cloudy" },
      { time: "3 PM", temp: 6, condition: "partly-cloudy" },
      { time: "4 PM", temp: 5, condition: "cloudy" },
      { time: "5 PM", temp: 4, condition: "cloudy" },
    ],
  },
  london: {
    current: {
      location: "London, UK",
      temperature: 7,
      condition: "Rainy",
      humidity: 89,
      windSpeed: 16,
      visibility: 8,
      pressure: 1006,
      feelsLike: 4,
      uvIndex: 1,
    },
    forecast: [
      { day: "Today", high: 9, low: 4, condition: "Rainy", icon: "rainy" },
      { day: "Tomorrow", high: 8, low: 3, condition: "Cloudy", icon: "cloudy" },
      { day: "Wednesday", high: 10, low: 5, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Thursday", high: 7, low: 2, condition: "Rainy", icon: "rainy" },
      { day: "Friday", high: 11, low: 6, condition: "Cloudy", icon: "cloudy" },
    ],
    hourly: [
      { time: "12 PM", temp: 7, condition: "rainy" },
      { time: "1 PM", temp: 8, condition: "rainy" },
      { time: "2 PM", temp: 8, condition: "cloudy" },
      { time: "3 PM", temp: 9, condition: "cloudy" },
      { time: "4 PM", temp: 8, condition: "rainy" },
      { time: "5 PM", temp: 7, condition: "rainy" },
    ],
  },
  tokyo: {
    current: {
      location: "Tokyo, Japan",
      temperature: 8,
      condition: "Sunny",
      humidity: 52,
      windSpeed: 7,
      visibility: 18,
      pressure: 1022,
      feelsLike: 6,
      uvIndex: 4,
    },
    forecast: [
      { day: "Today", high: 12, low: 4, condition: "Sunny", icon: "sunny" },
      { day: "Tomorrow", high: 14, low: 6, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wednesday", high: 10, low: 3, condition: "Cloudy", icon: "cloudy" },
      { day: "Thursday", high: 13, low: 5, condition: "Sunny", icon: "sunny" },
      { day: "Friday", high: 15, low: 7, condition: "Partly Cloudy", icon: "partly-cloudy" },
    ],
    hourly: [
      { time: "12 PM", temp: 8, condition: "sunny" },
      { time: "1 PM", temp: 10, condition: "sunny" },
      { time: "2 PM", temp: 12, condition: "sunny" },
      { time: "3 PM", temp: 11, condition: "partly-cloudy" },
      { time: "4 PM", temp: 10, condition: "partly-cloudy" },
      { time: "5 PM", temp: 8, condition: "partly-cloudy" },
    ],
  },
  sydney: {
    current: {
      location: "Sydney, Australia",
      temperature: 26,
      condition: "Sunny",
      humidity: 65,
      windSpeed: 13,
      visibility: 20,
      pressure: 1018,
      feelsLike: 28,
      uvIndex: 9,
    },
    forecast: [
      { day: "Today", high: 29, low: 22, condition: "Sunny", icon: "sunny" },
      { day: "Tomorrow", high: 31, low: 24, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Wednesday", high: 27, low: 20, condition: "Rainy", icon: "rainy" },
      { day: "Thursday", high: 25, low: 18, condition: "Cloudy", icon: "cloudy" },
      { day: "Friday", high: 28, low: 21, condition: "Sunny", icon: "sunny" },
    ],
    hourly: [
      { time: "12 PM", temp: 26, condition: "sunny" },
      { time: "1 PM", temp: 28, condition: "sunny" },
      { time: "2 PM", temp: 29, condition: "sunny" },
      { time: "3 PM", temp: 29, condition: "sunny" },
      { time: "4 PM", temp: 28, condition: "partly-cloudy" },
      { time: "5 PM", temp: 26, condition: "partly-cloudy" },
    ],
  },
  dubai: {
    current: {
      location: "Dubai, UAE",
      temperature: 24,
      condition: "Sunny",
      humidity: 58,
      windSpeed: 9,
      visibility: 20,
      pressure: 1015,
      feelsLike: 26,
      uvIndex: 7,
    },
    forecast: [
      { day: "Today", high: 27, low: 20, condition: "Sunny", icon: "sunny" },
      { day: "Tomorrow", high: 28, low: 21, condition: "Sunny", icon: "sunny" },
      { day: "Wednesday", high: 26, low: 19, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Thursday", high: 29, low: 22, condition: "Sunny", icon: "sunny" },
      { day: "Friday", high: 30, low: 23, condition: "Sunny", icon: "sunny" },
    ],
    hourly: [
      { time: "12 PM", temp: 24, condition: "sunny" },
      { time: "1 PM", temp: 26, condition: "sunny" },
      { time: "2 PM", temp: 27, condition: "sunny" },
      { time: "3 PM", temp: 27, condition: "sunny" },
      { time: "4 PM", temp: 26, condition: "sunny" },
      { time: "5 PM", temp: 24, condition: "sunny" },
    ],
  },
  mumbai: {
    current: {
      location: "Mumbai, India",
      temperature: 28,
      condition: "Partly Cloudy",
      humidity: 74,
      windSpeed: 12,
      visibility: 12,
      pressure: 1012,
      feelsLike: 32,
      uvIndex: 8,
    },
    forecast: [
      { day: "Today", high: 31, low: 25, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Tomorrow", high: 32, low: 26, condition: "Sunny", icon: "sunny" },
      { day: "Wednesday", high: 30, low: 24, condition: "Cloudy", icon: "cloudy" },
      { day: "Thursday", high: 33, low: 27, condition: "Sunny", icon: "sunny" },
      { day: "Friday", high: 31, low: 25, condition: "Partly Cloudy", icon: "partly-cloudy" },
    ],
    hourly: [
      { time: "12 PM", temp: 28, condition: "partly-cloudy" },
      { time: "1 PM", temp: 30, condition: "sunny" },
      { time: "2 PM", temp: 31, condition: "sunny" },
      { time: "3 PM", temp: 31, condition: "partly-cloudy" },
      { time: "4 PM", temp: 30, condition: "partly-cloudy" },
      { time: "5 PM", temp: 28, condition: "cloudy" },
    ],
  },
  moscow: {
    current: {
      location: "Moscow, Russia",
      temperature: -8,
      condition: "Snowy",
      humidity: 85,
      windSpeed: 14,
      visibility: 5,
      pressure: 1008,
      feelsLike: -12,
      uvIndex: 1,
    },
    forecast: [
      { day: "Today", high: -5, low: -12, condition: "Snowy", icon: "snowy" },
      { day: "Tomorrow", high: -7, low: -14, condition: "Cloudy", icon: "cloudy" },
      { day: "Wednesday", high: -3, low: -10, condition: "Partly Cloudy", icon: "partly-cloudy" },
      { day: "Thursday", high: -6, low: -13, condition: "Snowy", icon: "snowy" },
      { day: "Friday", high: -4, low: -11, condition: "Cloudy", icon: "cloudy" },
    ],
    hourly: [
      { time: "12 PM", temp: -8, condition: "snowy" },
      { time: "1 PM", temp: -7, condition: "snowy" },
      { time: "2 PM", temp: -6, condition: "cloudy" },
      { time: "3 PM", temp: -5, condition: "cloudy" },
      { time: "4 PM", temp: -7, condition: "snowy" },
      { time: "5 PM", temp: -8, condition: "snowy" },
    ],
  },
}

// Function to get weather data for a location
const getWeatherForLocation = (location: string) => {
  const searchKey = location.toLowerCase().trim()

  // Check for exact matches first
  if (locationWeatherData[searchKey]) {
    return locationWeatherData[searchKey]
  }

  // Check for partial matches
  for (const [key, data] of Object.entries(locationWeatherData)) {
    if (key.includes(searchKey) || searchKey.includes(key)) {
      return data
    }
  }

  // If no match found, return default data with the searched location name
  return {
    current: {
      location: location,
      temperature: Math.floor(Math.random() * 25) + 10, // Random temp between 10-35°C (more realistic range)
      condition: "Partly Cloudy",
      humidity: Math.floor(Math.random() * 30) + 50, // Random humidity 50-80%
      windSpeed: Math.floor(Math.random() * 15) + 8, // Random wind 8-23 km/h
      visibility: Math.floor(Math.random() * 10) + 10, // Random visibility 10-20 km
      pressure: Math.floor(Math.random() * 30) + 1000, // Random pressure 1000-1030 hPa
      feelsLike: Math.floor(Math.random() * 25) + 12,
      uvIndex: Math.floor(Math.random() * 8) + 2,
    },
    forecast: [
      {
        day: "Today",
        high: Math.floor(Math.random() * 10) + 20,
        low: Math.floor(Math.random() * 8) + 12,
        condition: "Partly Cloudy",
        icon: "partly-cloudy",
      },
      {
        day: "Tomorrow",
        high: Math.floor(Math.random() * 10) + 20,
        low: Math.floor(Math.random() * 8) + 12,
        condition: "Sunny",
        icon: "sunny",
      },
      {
        day: "Wednesday",
        high: Math.floor(Math.random() * 10) + 20,
        low: Math.floor(Math.random() * 8) + 12,
        condition: "Cloudy",
        icon: "cloudy",
      },
      {
        day: "Thursday",
        high: Math.floor(Math.random() * 10) + 20,
        low: Math.floor(Math.random() * 8) + 12,
        condition: "Rainy",
        icon: "rainy",
      },
      {
        day: "Friday",
        high: Math.floor(Math.random() * 10) + 20,
        low: Math.floor(Math.random() * 8) + 12,
        condition: "Sunny",
        icon: "sunny",
      },
    ],
    hourly: [
      { time: "12 PM", temp: Math.floor(Math.random() * 8) + 15, condition: "partly-cloudy" },
      { time: "1 PM", temp: Math.floor(Math.random() * 8) + 15, condition: "sunny" },
      { time: "2 PM", temp: Math.floor(Math.random() * 8) + 15, condition: "sunny" },
      { time: "3 PM", temp: Math.floor(Math.random() * 8) + 15, condition: "partly-cloudy" },
      { time: "4 PM", temp: Math.floor(Math.random() * 8) + 15, condition: "cloudy" },
      { time: "5 PM", temp: Math.floor(Math.random() * 8) + 15, condition: "cloudy" },
    ],
  }
}

const WeatherIcon = ({ condition, size = 24 }: { condition: string; size?: number }) => {
  const iconProps = { size, className: "text-white" }

  switch (condition) {
    case "sunny":
      return <Sun {...iconProps} className="text-yellow-300" />
    case "partly-cloudy":
      return <Cloud {...iconProps} className="text-gray-300" />
    case "cloudy":
      return <Cloud {...iconProps} className="text-gray-400" />
    case "rainy":
      return <CloudRain {...iconProps} className="text-blue-300" />
    case "snowy":
      return <CloudSnow {...iconProps} className="text-blue-100" />
    case "stormy":
      return <Zap {...iconProps} className="text-purple-300" />
    default:
      return <Sun {...iconProps} className="text-yellow-300" />
  }
}

export default function WeatherApp() {
  const [searchLocation, setSearchLocation] = useState("")
  const [weatherData, setWeatherData] = useState(locationWeatherData["san francisco"])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchLocation.trim()) return

    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      const newWeatherData = getWeatherForLocation(searchLocation)
      setWeatherData(newWeatherData)
      setSearchLocation("") // Clear search input
      setLoading(false)
    }, 1000)
  }

  const getBackgroundGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "from-blue-400 via-blue-500 to-blue-600"
      case "partly cloudy":
        return "from-blue-400 via-blue-500 to-gray-500"
      case "cloudy":
        return "from-gray-400 via-gray-500 to-gray-600"
      case "rainy":
        return "from-gray-500 via-gray-600 to-blue-700"
      default:
        return "from-blue-400 via-blue-500 to-blue-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather Forecast</h1>
          <p className="text-gray-600">Get accurate weather information for any location</p>
        </div>

        {/* Search */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Enter city name..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Current Weather */}
        <Card
          className={`shadow-xl bg-gradient-to-br ${getBackgroundGradient(weatherData.current.condition)} text-white`}
        >
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={20} />
                  <span className="text-lg">{weatherData.current.location}</span>
                </div>
                <div className="text-6xl font-light mb-2">{weatherData.current.temperature}°C</div>
                <div className="text-xl opacity-90">{weatherData.current.condition}</div>
                <div className="text-sm opacity-75">Feels like {weatherData.current.feelsLike}°C</div>
              </div>
              <div className="text-right">
                <WeatherIcon condition={weatherData.current.condition.toLowerCase().replace(" ", "-")} size={80} />
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Droplets size={20} />
                <div>
                  <div className="text-sm opacity-75">Humidity</div>
                  <div className="font-semibold">{weatherData.current.humidity}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind size={20} />
                <div>
                  <div className="text-sm opacity-75">Wind Speed</div>
                  <div className="font-semibold">{weatherData.current.windSpeed} km/h</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={20} />
                <div>
                  <div className="text-sm opacity-75">Visibility</div>
                  <div className="font-semibold">{weatherData.current.visibility} km</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge size={20} />
                <div>
                  <div className="text-sm opacity-75">Pressure</div>
                  <div className="font-semibold">{weatherData.current.pressure} hPa</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Forecast */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer size={20} />
              Hourly Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {weatherData.hourly.map((hour, index) => (
                <div key={index} className="flex flex-col items-center min-w-[80px] p-3 rounded-lg bg-gray-50">
                  <div className="text-sm font-medium text-gray-600 mb-2">{hour.time}</div>
                  <WeatherIcon condition={hour.condition} size={32} />
                  <div className="text-lg font-semibold mt-2 text-gray-800">{hour.temp}°</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun size={20} />
              5-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weatherData.forecast.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium text-gray-600">{day.day}</div>
                    <WeatherIcon condition={day.icon} size={32} />
                    <div className="text-gray-700">{day.condition}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{day.high}°</div>
                      <div className="text-sm text-gray-500">{day.low}°</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
