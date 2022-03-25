from app.models import db, StimAid

def seed_stim_aids():
    tangle = StimAid(
        owner_id=4, image_url="https://i5.walmartimages.com/asr/be2f788b-c8ad-41dd-98f8-5604d9dc70e9_1.bc3651566b2eaa3cd235ed05a2555294.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF.jpg", name="Tangle", description="Tangles are a great stim aid for fidgety hands! It's made of several links that you can twist and mold into different shapes. You can also take them apart and change the size.", noise_rating=2, chew_rating=0, texture_rating=3, consistency_rating=5)
    pop_it = StimAid(
        owner_id=4, image_url="https://dollardays.imgix.net/images/t116/image2/pt-1.jpg", name="Bubble Pop It", description="It's like reusable bubble wrap! You can push the bubbles back and forth. If you set it on a flat surface, you can get a louder pop.", noise_rating=2, chew_rating=0, texture_rating=1, consistency_rating=1)
    pop_tube = StimAid(
        owner_id=1, image_url="https://www.ubuy.hu/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjE3cDhuRUtjUVMuX0FDX1NMMTAwMF8uanBn.jpg", name="Pop Tube", description="These are long tubes that you can stretch, shrink, and link together.", noise_rating=4, chew_rating=0, texture_rating=0, consistency_rating=0)
    squishy_ball = StimAid(
        owner_id=2, image_url="https://m.media-amazon.com/images/I/81pocoHe6oS._AC_SL1500_.jpg", name="Squishy Ball", description="Like slime, but contained and messy free.", noise_rating=0, chew_rating=0, texture_rating=1, consistency_rating=1)
    chewelry = StimAid(
        owner_id=1, image_url="https://m.media-amazon.com/images/I/71jpW0sFZ3L._AC_SX425_.jpg", name="Chewelry", description="Silicone jewelry you can discreetly wear and chew on when needed.", noise_rating=1, chew_rating=4, texture_rating=1, consistency_rating=2)


    db.session.add(tangle)
    db.session.add(pop_it)
    db.session.add(pop_tube)
    db.session.add(squishy_ball)
    db.session.add(chewelry)

    db.session.commit()


def undo_stim_aids():
    db.session.execute('TRUNCATE stim_aids RESTART IDENTITY CASCADE;')
    db.session.commit()
