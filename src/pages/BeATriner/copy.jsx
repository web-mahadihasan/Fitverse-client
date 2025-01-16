import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CloudUpload, Paperclip } from "lucide-react";
// import {
//   FileInput,
//   FileUploader,
//   FileUploaderContent,
//   FileUploaderItem,
// } from "@/components/ui/file-upload";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   MultiSelector,
//   MultiSelectorContent,
//   MultiSelectorInput,
//   MultiSelectorItem,
//   MultiSelectorList,
//   MultiSelectorTrigger,
// } from "@/components/ui/multi-select";
import toast from "react-hot-toast";

const formSchema = z.object({
  // name: z.string(),
  // email: z.string(),
  // age: z.string(),
//   image: z.string(),
    skills: z.array(z.string()).optional(),
//   availableDays: z.number(),
  // availableTime: z.string(),
});

export default function BeATrainerCopy({setSkills}) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        skills: [],
      },
  });

 
 
  const onSubmit = async (data) => {
    console.log(data)
    setSkills(data)
    // try {
    //   console.log('d');
    //   toast.success("success");
    // } catch (error) {
    //   console.error("Form submission error", error);
    //   toast.error("Failed to submit the form. Please try again.");
    // }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
         {/* <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Name" type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
        {/* <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-white text-left dark:text-white"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm tracking-wide font-poppins rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="John Doe"
        />
      </div> */}

        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="Age" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={dropZoneConfig}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent>
                    {files &&
                      files.length > 0 &&
                      files.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Paperclip className="h-4 w-4 stroke-current" />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Additional fields like checkboxes, multi-select, etc., omitted for brevity */}
        <div className="grid grid-cols-12 gap-4">
            {[
                { label: "Bootcamp", value: "Bootcamp" },
                { label: "Pilates", value: "Pilates" },
                { label: "Yoga", value: "Yoga" },
                { label: "Indoor cycling", value: "Indoor cycling" },
                { label: "Bounce & Burn", value: "Bounce & Burn" },
                { label: "Body Blast", value: "Body Blast" },
                { label: "Pump & Sculpt", value: "Pump & Sculpt" },
            ].map((skill, index) => (
                <div key={index} className="col-span-4">
                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                        <Checkbox
                            checked={field.value?.includes(skill.value) || false}
                            onCheckedChange={(checked) => {
                            const updatedSkills = checked
                                ? [...(field.value || []), skill.value]
                                : field.value?.filter((item) => item !== skill.value);
                            field.onChange(updatedSkills); // Update the field value
                            }}
                        />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                        <FormLabel>{skill.label}</FormLabel>
                        <FormMessage />
                        </div>
                    </FormItem>
                    )}
                />
                </div>
            ))}
            </div>
            
        
            {/* <FormField
              
              name="name"
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            / */}
           {/* <FormField
              control={form.control}
              name="availableDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Days</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-xs"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select languages" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                      <MultiSelectorList>
                        <MultiSelectorItem value={"React"}>React</MultiSelectorItem>
                        <MultiSelectorItem value={"Vue"}>Vue</MultiSelectorItem>
                        <MultiSelectorItem value={"Svelte"}>Svelte</MultiSelectorItem>
                      </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            /> */}
        
        {/* <FormField
          control={form.control}
          name="availableTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Time in a Day</FormLabel>
              <FormControl>
                <Input 
                placeholder="Available Time in a Day"
                
                type="number"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
