from datetime import datetime
from app.models import db, Post


def seed_posts():
    demo2_post = Post(
        user_id=2, title="Kayaking", body="When I was a kid, I competed in the Junior Olympics for kayaking.", created_at=datetime.now(), updated_at=datetime.now())
    james_post = Post(
        user_id=5, title="To Play or not to Play", body="Got back into playing guitar since in AA and got recording software but never seem to have the time or the drive after all my time goes to AA and family.", created_at=datetime.now(), updated_at=datetime.now())
    brendon_post = Post(
        user_id=6, title="Once upon a time...", body="Once upon a time in another lifetime, I was a music teacher. I probably still would be if the pandemic hadn't made the job/lifestyle unsuitable for me.", created_at=datetime.now(), updated_at=datetime.now())
    katerina_post = Post(
        user_id=7, title="Goals", body="Hoping to visit every country by the age of 50 :)", created_at=datetime.now(), updated_at=datetime.now())
    joan_post = Post(
        user_id=8, title="Getting Outside", body="Since I was little, I've loved doing anything active outside. I used to challenge my older brothers to races in the backyard. I really enjoy the feeling of accomplishing something physically challenging, since you feel physically tired and can see how far you've run or hiked...or how fast :) Whenever I have free time, I try to move outside and it always puts me in a better mood, and I'm grateful for those moments.", created_at=datetime.now(), updated_at=datetime.now())
    whit_post1 = Post(
        user_id=9, title="Reduction Printmaking", body="A reduction print, in woodblock printing, is when you use one wood block to print multiple colors in a single design. You start out carving anything in your design you wish to stay the color of the paper. Then begin printing your block (through a press or by hand) from lightest color to darkest, layer by layer, carving out what you want to stay a particular color. The upside to this is you can get a lot of layers and depth with only one woodblock--but make sure to make a large number of prints from the beginning because once areas are carved out, you'll never be able to reprint them!", created_at=datetime.now(), updated_at=datetime.now())
    john_post = Post(
        user_id=10, title="Fast Skier", body=" I have been clocked at 67 mph on skis before.", created_at=datetime.now(), updated_at=datetime.now())
    leonel_post = Post(
        user_id=11, title="One Day...", body="I want to one day have a garden that includes a lime tree, avocado tree, cactus, and chilli tree.", created_at=datetime.now(), updated_at=datetime.now())
    whit_post2 = Post(
        user_id=9, title="Coca-Cola Printmaking!", body="You can actually do intaglio/etching printmaking with Coca-Cola! It's called Kitchen Litho and you etch aluminum foil using Coke! You basically use any materials that are oily--even using your fingers or straight up olive oil! Usually you'll want to use something you can actually see well, like soft graphite pencils or oil-based paints. 'The phosphoric acid and gum arabic in the cola makes the areas that have not been drawn on , hydrophilic. This means water will sit in a film on the surface, but be repelled from the drawn areas, which will catch the ink from your roller.' (https://alisonsloggett.com/2017/07/26/kitchen-litho-how-to/) If done carefully and printed without tearing the foil you could probably get up to 200 prints per foil! You can do any size you want. In a book I once read, they would put up large sheets on the bathtub walls so pouring coke on it would go down the drain! That makes inking and printing a little difficult but its doable! If you want more steps, I definitely recommend 'Kitchen Lithography: Hand Printing at Home' by Laura Sofie Hantke and Lucas Grassmann!", created_at=datetime.now(), updated_at=datetime.now())
    david_post = Post(
        user_id=12, title="Animorphs (SPOILERS!!!!!!!!!!!!!!!!!!!!)", body="Animorphs is a story about five teens (I think they were teens, maybe they were even younger) who have the ability to 'morph' or change into any animal they want to, as long as they've acquired its DNA. How do they do that? Well, it turns out that for some reason they can get an animal's DNA just by touching it. Which seems like it would be easy, but some animals are scary! And get this. They can even morph into aliens! I guess because aliens are technically animals? Oh yeah, did I mention there were aliens in this story? BECAUSE THERE ARE! In fact, that's how they get the ability to morph into animals... alien technology! It's not all fun and games, though. That's because some aliens are bad and want to live inside your brain (messed up, I know). The Yeerks are basically space slugs that invade the bodies of other creatures and attach themselves to their brains so they can control them. I think maybe they need a host to survive, but I don't remember. The Andalites are blue space centaurs that developed the technology to morph into other species and are using it to fight the Yeerks. But it's not going so well, so a dying Andalite prince decides to recruit five human teenagers to help in the fight. And I haven't even gotten to the Taxxons or the Hork-Bajir or nothlits or kandrona rays, but you get the idea. ANIMORPHS 4 LIFE!!!!", created_at=datetime.now(), updated_at=datetime.now())
    vern_post = Post(
        user_id=13, title="I will fix it!", body="Computers, laptops, phones, keyboards, tablets, you name it !!", created_at=datetime.now(), updated_at=datetime.now())


    db.session.add(demo2_post)
    db.session.add(james_post)
    db.session.add(brendon_post)
    db.session.add(katerina_post)
    db.session.add(joan_post)
    db.session.add(whit_post1)
    db.session.add(john_post)
    db.session.add(leonel_post)
    db.session.add(whit_post2)
    db.session.add(david_post)
    db.session.add(vern_post)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
