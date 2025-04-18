import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
const testimonials = [
  {
    name: "John Doe",
    title: "CEO of Tech Innovations",
    content:
      "This AI tool has changed the way I work. It's like having a personal assistant that never sleeps!",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQprAug0cp7rX74y-zFfLXUr-5xsG0y0nWN8g&s",
  },
  {
    name: "Jane Smith",
    title: "Product Manager at Creative Solutions",
    content:
      "I can't believe how much time I've saved using this tool. It's a game-changer!",
    image:
      "https://www.shecos.com/blog/wp-content/uploads/2019/06/lois-griffin-costume-diy.jpg",
  },
  {
    name: "Alice Johnson",
    title: "Freelance Designer",
    content:
      "The results are impressive! I highly recommend this AI tool to anyone looking to boost their productivity.",
    image:
      "https://preview.redd.it/megatron-griffin-v0-5tuqxjlq3u0e1.png?auto=webp&s=5ca5b7f3c682e56bc556e53cadc78c0c66f44491",
  },
  {
    name: "Bob Brown",
    title: "Marketing Specialist",
    content:
      "I was skeptical at first, but this AI tool exceeded my expectations. It's truly amazing!",
    image:
      "https://c8.alamy.com/comp/PMBMDP/brian-griffin-family-guy-season-12-PMBMDP.jpg",
  },
  {
    name: "Tom Marvolo Riddle",
    title: "Lord Voldemort ",
    content: "Avada Kedavra ",
    image:
      "https://boundingintocomics.com/cdn-cgi/image/width=788,height=444,fit=crop,quality=80,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2024/10/08988.png",
  },
];
const LandingTestimonial = () => {
  return (
    <div className="px-10 pb-20">
      <h2
        className="text-center text-4xl 
    font-extrabold mb-10"
      >
        Testimonials
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-col-2 
    md:grid-cols3 lg:grid-cols-4 font-extrabold mb-10 gap-4 "
      >
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.content}
            className=" border-none bg-gray-300 dark:bg-[#1b1c1d]"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-sm">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0 flex flex-col ">
                <Avatar className="w-fit h-fit mb-2">
                  <AvatarImage src={testimonial?.image || ""} />
                </Avatar>
                {testimonial.content}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default LandingTestimonial;
