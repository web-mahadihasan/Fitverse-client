import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const CalculateBMI = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    activityFactor: "",
  })

  const [bmi, setBmi] = useState(0)
  const [bmiCategory, setBmiCategory] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const calculateBMI = (e) => {
    e.preventDefault()

    const heightInMeters = Number.parseFloat(formData.height) / 100
    const weight = Number.parseFloat(formData.weight)

    if (heightInMeters > 0 && weight > 0) {
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1)
      setBmi(bmiValue)

      // Determine BMI category
      if (bmiValue < 18.5) {
        setBmiCategory("Underweight")
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setBmiCategory("Normal weight")
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setBmiCategory("Overweight")
      } else {
        setBmiCategory("Obese")
      }
    }
  }

  return (
    <div
      className="h-auto md:h-[600px] flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://i.ibb.co.com/GpGVT7j/gym-workout-66d087d56ef90.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-white text-xl font-semibold mb-2">GET INTO SHAPE, NOW!</h2>
          <h1 className="text-4xl font-bold">
            <span className="text-white">BMI </span>
            <span className="text-red-500">CALCULATOR</span>
          </h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            BMI is a reliable guide to estimate the healthy weight range based on height, weight & age. It is recognized
            by the Insurance, Health Professionals and Government.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm">
            <form onSubmit={calculateBMI} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Height / cm</label>
                  <Input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border-gray-600 text-white"
                    placeholder="175"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Weight / kg</label>
                  <Input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border-gray-600 text-white"
                    placeholder="70"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Age</label>
                  <Input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border-gray-600 text-white"
                    placeholder="25"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Gender</label>
                  <Select name="gender" onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger className="w-full bg-white/10 border-gray-600 text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">Activity Factor</label>
                  <Select name="activityFactor" onValueChange={(value) => handleSelectChange("activityFactor", value)}>
                    <SelectTrigger className="w-full bg-white/10 border-gray-600 text-white">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Lightly Active</SelectItem>
                      <SelectItem value="moderate">Moderately Active</SelectItem>
                      <SelectItem value="very">Very Active</SelectItem>
                      <SelectItem value="extra">Extra Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md text-lg font-semibold"
              >
                CALCULATE
              </Button>
            </form>
          </div>

          <div className="bg-black/40 p-8 rounded-lg backdrop-blur-sm flex flex-col items-center justify-center">
            <h2 className="text-white text-2xl mb-6">Your BMI is</h2>
            <div className="text-white text-7xl font-bold mb-6">{bmi > 0 ? bmi : "0.0"}</div>
            {bmiCategory && (
              <div className="text-center">
                <div
                  className="text-xl font-semibold mb-2"
                  style={{
                    color:
                      bmiCategory === "Normal weight"
                        ? "#4ade80"
                        : bmiCategory === "Underweight"
                          ? "#fbbf24"
                          : bmiCategory === "Overweight"
                            ? "#fb923c"
                            : "#ef4444",
                  }}
                >
                  {bmiCategory}
                </div>
                <p className="text-gray-300 text-sm">
                  {bmiCategory === "Normal weight"
                    ? "Great! You are in a healthy weight range."
                    : bmiCategory === "Underweight"
                      ? "You may need to gain some weight. Consult a healthcare provider."
                      : bmiCategory === "Overweight"
                        ? "You may need to lose some weight for better health."
                        : "It is recommended to lose weight. Consult a healthcare provider."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculateBMI