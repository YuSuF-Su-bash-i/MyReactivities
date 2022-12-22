export interface Activity {
   id: string
   title: string
   date: Date | null //we should make this guy nullable, otherwise it will give error in activityForm -> setActivity
   description: string
   category: string
   city: string
   venue: string
}
