fn main() {
    
    let x: i32 =16;
    println!("{}",x);

    let z: String = String::from("Hello, Soroban!");
    let y:&str = "Hello, Stellar!";

    println!("{y}");
    println!("{z}");

    // Functions -> fn -> pub fn -> private

    /* pub fn event (name: String) {
        let name: String = String::from("Melek");
        println!("{}", name);
    } */
   let e:EventForKids = EventForKids{
    name:String::from("KidsCo"),
    date:String::from("28.05.2025"),
    number_of_participants: 1000,
    place:String::from("Ist, TR")
   };


}


   struct EventForKids{
    name:String,
    date:String,
    number_of_participants: u32,
    place:String
   }
   enum ErrorsForEvent{
    NoEvent,
    CancelledEvent,
    EventType

   }
