const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
    async createItem(parent, args, ctx, info){
        // TODO: check if they are logged in

        const item = await ctx.db.mutation.createItem({
            data:{
                ...args
            }
        }, info);

        return item;
    },

    updateItem(parent, args, ctx, info){
        // TODO: check if they are logged in
        //first take a copy of the updates
        const updates = { ...args };
        //remove the ID from the updates
        delete updates.id;
        //run the update method 
        const item = ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info);

        return item;
    },
    async deleteItem(parent, args, ctx, info){
        //1- find item
        const where = {id: args.id};
        const item = await ctx.db.query.item({ where }, `{ id title }`);

        //2- check if user can delete it

        //3- delete the item
        return ctx.db.mutation.deleteItem({ where }, info);
    },
    async signup(parent, args, ctx, info){
        // lower case email
        args.email = args.email.toLowerCase();
        //hash the password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in db
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set: ['USER']},

            },
            info
        });
        //create a JWT for user
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET);
        //set jwt as cookie
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000*60*60*24*365,//1 year

        });
        return user;
    }
};

module.exports = Mutations;
