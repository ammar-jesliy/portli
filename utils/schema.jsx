const { pgTable, serial, varchar, text, integer } = require("drizzle-orm/pg-core");

export const userInfo = pgTable('user_info', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username'),
    bio: text('bio'),
    profileImage: varchar('profile_image'),
    banner: varchar('banner'),
});

export const userSocials = pgTable('user_socials', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => userInfo.id),
    platform: varchar('platform').notNull(),
    link: varchar('link').notNull(),
});