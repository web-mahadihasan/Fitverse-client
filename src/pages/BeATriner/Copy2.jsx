import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Copy2 = () => {
  const { register, handleSubmit, control, watch } = useForm();
  const onSubmit = (data) => console.log(data);

  const options = [
    { label: "Bootcamp", value: "Bootcamp" },
    { label: "Pilates", value: "Pilates" },
    { label: "Yoga", value: "Yoga" },
    { label: "Indoor cycling", value: "Indoor cycling" },
    { label: "Bounce & Burn", value: "Bounce & Burn" },
    { label: "Body Blast", value: "Body Blast" },
    { label: "Pump & Sculpt", value: "Pump & Sculpt" },
  ];

  const options2 = [
    { label: "Bounce & Burn", value: "Bounce & Burn" },
    { label: "Body Blast", value: "Body Blast" },
    { label: "Pump & Sculpt", value: "Pump & Sculpt" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            {...register("activities")}
            className="w-4 h-4 appearance-none border-2 border-gray-100 rounded bg-gray-100 checked:bg-black checked:ring-1 checked:ring-black checked:ring-offset-0 focus:outline-none"
          />
          <label
            htmlFor={option.value}
            className="ml-2 text-sm font-medium text-gray-900"
          >
            {option.label}
          </label>
        </div>
      ))}

      {options2.map((option) => (
        <div
          key={option.value}
          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
        >
          <Controller
            name="advancedActivities"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
              <>
                <Checkbox
                  id={option.value}
                  checked={value?.includes(option.value)}
                  onCheckedChange={(isChecked) => {
                    const updatedValue = isChecked
                      ? [...(value || []), option.value]
                      : value.filter((val) => val !== option.value);
                    onChange(updatedValue);
                  }}
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </>
            )}
          />
        </div>
      ))}

      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Copy2;
