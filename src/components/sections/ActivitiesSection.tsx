import { Calendar, MapPin, Users, Camera, Heart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useActivities, useProfile } from "@/hooks/usePortfolioData";

export function ActivitiesSection() {
  const { data: activitiesData, isLoading } = useActivities();
  const { data: profile } = useProfile();

  // Fallback data
  const defaultActivities = [
    {
      id: "1",
      title: "กิจกรรมค่ายวิชาการภาษาไทย",
      date_display: "15-17 มกราคม 2569",
      location: "โรงเรียน",
      participants: 120,
      description: "ค่ายพัฒนาทักษะภาษาไทยสำหรับนักเรียนชั้นประถมศึกษา",
      image_emoji: "🏕️",
      color_gradient_class: "from-primary to-coral",
    },
    {
      id: "2",
      title: "การแข่งขันตอบปัญหาวรรณคดี",
      date_display: "22 กุมภาพันธ์ 2569",
      location: "หอประชุมโรงเรียน",
      participants: 80,
      description: "การแข่งขันตอบปัญหาวรรณคดีไทยระดับเขตพื้นที่การศึกษา",
      image_emoji: "🏆",
      color_gradient_class: "from-secondary to-mint",
    },
    {
      id: "3",
      title: "โครงการรักการอ่าน",
      date_display: "ตลอดปีการศึกษา 2569",
      location: "ห้องสมุดโรงเรียน",
      participants: 250,
      description: "กิจกรรมส่งเสริมนิสัยรักการอ่านสำหรับนักเรียนทุกระดับชั้น",
      image_emoji: "📚",
      color_gradient_class: "from-lavender to-sky",
    },
    {
      id: "4",
      title: "ทัศนศึกษาพิพิธภัณฑ์วรรณกรรม",
      date_display: "5 มีนาคม 2569",
      location: "กรุงเทพมหานคร",
      participants: 45,
      description: "ทัศนศึกษาเรียนรู้ประวัติศาสตร์วรรณกรรมไทย",
      image_emoji: "🚌",
      color_gradient_class: "from-accent to-peach",
    },
  ];

  if (isLoading) {
    return <div className="py-20 text-center text-muted-foreground">กำลังโหลดข้อมูลกิจกรรม...</div>;
  }

  const activities = activitiesData || [];

  return (
    <section id="activities" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">กิจกรรมในชั้นเรียน</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            กิจกรรม<span className="text-gradient-primary">สร้างสรรค์</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {profile?.activities_description || "กิจกรรมต่างๆ ที่ครูสถาพรจัดขึ้นเพื่อส่งเสริมการเรียนรู้และพัฒนาทักษะของนักเรียน ปีการศึกษา 2569"}
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((activity: any, index: number) => (
            <Link
              key={activity.id}
              to={`/activities/${activity.id}`}
              className="block"
            >
              <Card
                className="group hover-lift border-none shadow-soft bg-card overflow-hidden cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image Section */}
                    <div className={`sm:w-1/3 p-8 bg-gradient-to-br ${activity.color_gradient_class} flex items-center justify-center`}>
                      <span className="text-6xl group-hover:scale-110 transition-transform drop-shadow-md">
                        {activity.image_emoji}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      <h3 className="font-semibold text-foreground text-lg mb-3 group-hover:text-primary transition-colors">
                        {activity.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{activity.date_display}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4 text-accent" />
                          <span>{activity.participants} คน</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {activity.description}
                      </p>

                      {/* External Links */}
                      {activity.external_links && Array.isArray(activity.external_links) && activity.external_links.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {activity.external_links.map((link: any, i: number) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md hover:bg-accent/20 transition-colors flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {link.title}
                            </a>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-4">
                        <Badge variant="secondary" className="text-xs">
                          <Camera className="w-3 h-3 mr-1" />
                          ดูภาพกิจกรรม
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section >
  );
}
