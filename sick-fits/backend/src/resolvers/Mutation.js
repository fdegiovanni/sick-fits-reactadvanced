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
    }
};

module.exports = Mutations;
