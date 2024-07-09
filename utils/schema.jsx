const { pgTable, serial, varchar, text, integer, jsonb } = require("drizzle-orm/pg-core");

export const userInfo = pgTable('user_info', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull(),
    username: varchar('username'),
    bio: text('bio'),
    profileImage: varchar('profile_image'),
    banner: varchar('banner'),
    theme: varchar('theme').default('light'),
});

export const userSocials = pgTable('user_socials', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => userInfo.id),
    platform: varchar('platform').notNull(),
    link: varchar('link').notNull(),
});

export const userLayouts = pgTable('user_layouts', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => userInfo.id).unique(),
    desktopLayout: jsonb('desktop_layout'),
    mobileLayout: jsonb('mobile_layout'),
});

export const components = pgTable('components', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => userInfo.id),
    layoutId: integer('layout_id').references(() => userLayouts.id),
    type: varchar('type').notNull(),
    data: jsonb('data'),
});