import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Calendar, Briefcase, Github, Twitter, LinkedinIcon as LinkedIn, Facebook } from "lucide-react"
import useGetUser from "../../../../hooks/useGetUser"
import useAuth from "../../../../hooks/useAuth"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import useAxiosSecured from "../../../../hooks/useAxiosSecured"
import Swal from "sweetalert2"
import { Helmet } from "react-helmet"
import SectionBadge from "../../../../components/common/SectionBadge"
import SectionHeading from "../../../../components/common/SectionHeading"

export default function UserProfile() {
    const [getUser, refetch] = useGetUser()
    const {user, updataUser} = useAuth()
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState("")
    const axiosSecured = useAxiosSecured()

    const cloudinaryApi = import.meta.env.VITE_CLOUDINARY_API
    const {
         register,
         handleSubmit,
         reset,
         formState: { errors },
       } = useForm()

    useEffect(()=> {
        if(getUser?.image){
            setImage(getUser?.image)
        }
    },[getUser])

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0]
        const formData = new FormData();
        formData.append("file", imageFile)
        formData.append("upload_preset", "fitVerse")
        setUploading(true)
        try {
            const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryApi}/image/upload`,
                formData
            )
          
            setImage(data?.url)
            setUploading(false)
        } catch (error) {
            console.log(error)
        }   
    }

    const onSubmit = async (data) => {
        const updateFirebase = {
            displayName: data.name,
            photoURL: image
        }
        const updateDatabse = {
            name: data?.name,
            image: image,
            location: data?.location,
            about: data?.about,
            github: data?.github,
            facebook: data?.facebook,
            linkedin: data?.linkedin
        }
        console.log(updateDatabse)
        try {
            const update = await updataUser(updateFirebase)
            const {data} = await axiosSecured.patch(`/update-profile/${user?.email}`, updateDatabse)
            if(data.modifiedCount > 0){
                Swal.fire({
                    icon: "success",
                    title: "Successfull",
                    text: "Your profile successfully updated",
                });
                reset()
                refetch()
            }
        } catch (error) {
            Swal.fire({
                 icon: "error",
                 title: "Update Failed",
                 text: "Something went wrong! Try again",
             });
            console.log(error)
        }
    }
    // console.log(image)

  return (
    <div className="container mx-auto py-10 font-poppins">
      <Helmet>
          <title>Fitverse | Dashboard - Profile </title>
          <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
      </Helmet>
      <div className="mb-6">
        <SectionBadge title={"Profile"}/>
        <SectionHeading
          title={"Manage your profile"}
          subtitle={"Manage your profile effortlessly! Update your personal details, change your settings, and make it truly yours."}
        />
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full max-w-md mb-8">
          <TabsTrigger
            value="profile"
            className="flex-1 data-[state=active]:bg-red-100 data-[state=active]:text-red-900"
          >
            My Profile
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex-1 data-[state=active]:bg-red-100 data-[state=active]:text-red-900"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column - Image and Basic Info */}
            <Card className="lg:col-span-4">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-48 h-48 mb-6">
                    <img
                      src={getUser?.image}
                      alt="Profile picture"
                      className="rounded-xl object-cover w-full h-full shadow-lg ring-4 ring-red-50"
                    />
                    <Badge className="absolute bottom-2 right-2 bg-green-500">Online</Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{getUser?.name}</h2>
                  <p className="text-muted-foreground mb-4 capitalize">{getUser?.role}</p>
                  {/* <Button className="bg-red-600 hover:bg-red-700 mb-4">Edit Profile</Button> */}
                  <div className="flex gap-4 text-muted-foreground">
                    <Github className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors" />
                    <Facebook className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors" />
                    <LinkedIn className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Detailed Info */}
            <Card className="lg:col-span-8">
              <CardHeader>
                <CardTitle className={'text-3xl font-kanit'}>Profile Information</CardTitle>
                <CardDescription>Personal and professional details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </div>
                    <p className="font-medium">{getUser?.location || "N/A"}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                    <p className="font-medium">{getUser?.email}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span>Role</span>
                    </div>
                    <p className="font-medium capitalize">{getUser?.role}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Joined</span>
                    </div>
                    {
                        getUser && <p className="font-medium">{format(getUser?.createTime, "PP")}</p>
                    }
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">About Me</h3>
                    <p className="text-muted-foreground">
                      {getUser?.about || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Last Login Time</h3>
                    <div className="flex flex-wrap gap-2 text-gray-700">
                      {user?.metadata?.lastSignInTime}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information here</CardDescription>
            </CardHeader>
            <CardContent className="">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-between">
                <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input 
                        {...register("name", { required: "Name is required" })}
                    id="name" defaultValue={getUser?.name} placeholder="Enter your display name" />
                    {errors.name && <p className="text-red-500">{errors?.name?.message}</p>}
                </div>
                {/* Image upload  */}
                <div>
                    <Label htmlFor="file-upload">Upload Image</Label>
                    <div className="relative inline-flex w-full items-center gap-2 rounded-full border border-purple-600 text-sm font-poppins text-slate-500">
                        <input  onChange={handleImageUpload} id="file-upload"  name="file-upload"
                        type="file"
                        className="peer order-2 [&::file-selector-button]:hidden w-full"/>
                        <label
                        htmlFor="file-upload"
                        className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300  focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-emerald-300 peer-disabled:bg-emerald-300"
                        >
                        {" "}
                        Upload a file{" "}
                        </label>
                    </div>
                </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="designation">Location</Label>
                    <Input {...register("location", { required: "Location is required" })} id="designation" placeholder="Enter your designation" defaultValue={getUser?.location || ""} />
                    {errors.location && <p className="text-red-500">{errors?.location?.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                    {...register("about", { required: "About is required" })}
                    id="bio"
                    placeholder="Tell us about yourself"
                    className="min-h-[100px]"
                    defaultValue={getUser?.about || ""}
                    />
                    {errors.about && <p className="text-red-500">{errors?.about?.message}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="email">Github Link</Label>
                        <Input {...register("github")} id="github" type="url" placeholder="Enter your github" defaultValue={getUser?.github || ""} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Facebook Link</Label>
                        <Input {...register("facebook")}  id="facebook" type="url" placeholder="Enter your facebook" defaultValue={getUser?.github || ""} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Linkedin Link</Label>
                        <Input {...register("linkedin")} id="linkedin" type="url" placeholder="Enter your linkedin" defaultValue={getUser?.github || ""} />
                    </div>
                </div>
                <button type="submit" disabled={uploading} className="bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                    {
                        uploading? "Image uploadin..." : "Update Profile"
                    }
                </button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

