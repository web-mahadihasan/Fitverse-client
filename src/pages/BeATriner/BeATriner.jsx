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
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import BeATrainerCopy from "./copy";
import Copy2 from "./Copy2";
import PageCover from "../../components/common/PageCover";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  age: z.string(),
//   image: z.string(),
    // skills: z.array(z.string()).optional(),
//   availableDays: z.number(),
  availableTime: z.string(),
//   newName: z.string(),
});

export default function BeATrainer() {
  const [files, setFiles] = useState(null);
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState([]);

  // Use useEffect to load the data only once when the component mounts
  useEffect(() => {
    // Simulate a data fetch (replace this with your real API call)
    // const fetchUserData = async () => {
      const data = {
        name: "John Doe",
        email: "johndoe@example.com",
      };
      setUserData(data);
   

    // fetchUserData();
  }, []); // Empty dependency array ensures it runs only once


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: userData?.name || "",
        email: userData?.email || "",
        age: "",
        // skills: [],
        availableDays: ["React"],  
        availableTime: ""
      },
  });

 
 
  const onSubmit = async (data) => {
    console.log(skills)
    console.log(data)
    try {
      console.log('d');
      toast.success("success");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="mt-4">
      <PageCover title={"Trainer Application"} page={"trainer-appication"}/>
      <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
         <FormField
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
      />
      <div className="">
        <Copy2/>
      </div>

        <FormField
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
        />
        {/* <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <Checkbox value="value"/>
        </div> */}

        <FormField
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
        />

            {
                <BeATrainerCopy setSkills={setSkills}/>
            }
                
        <FormField
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
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  );
}
