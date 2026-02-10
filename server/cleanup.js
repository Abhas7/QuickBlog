import 'dotenv/config';
import Blog from './models/Blog.js';
import mongoose from 'mongoose';
import connectDB from './configs/db.js';

const cleanup = async () => {
    console.log('Starting cleanup...');
    try {
        await connectDB();
        console.log('Database connection attempt finished');

        const blogs = await Blog.find({ title: 'Test Blog' }).sort({ createdAt: -1 });
        console.log(`Found ${blogs.length} test blogs`);

        if (blogs.length > 1) {
            const idsToDelete = blogs.slice(1).map(b => b._id);
            console.log(`Attempting to delete ${idsToDelete.length} blogs:`, idsToDelete);
            const result = await Blog.deleteMany({ _id: { $in: idsToDelete } });
            console.log(`Successfully deleted ${result.deletedCount} duplicate test blogs`);
        } else {
            console.log('No duplicates found or only one test blog exists');
        }
    } catch (err) {
        console.error('Error during cleanup:', err);
    } finally {
        console.log('Cleanup finished, exiting...');
        process.exit(0);
    }
};

cleanup();
