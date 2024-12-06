import cron from 'node-cron';

import ProductController from './ProductController';
import MailController from './MailController';

cron.schedule('*/5 * * * *', async () => {
    try {
        const products = await ProductController.getAllProductsForMail({} as any, {} as any);

        if (products.length === 0) {
            console.log('No products available to send.');
            return;
        }

        let productDetails = `
            <table style="width: 100%; border-collapse: collapse; font-family: 'Arial', sans-serif; color: #333; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);">
                <thead>
                    <tr style="background-color: #3c8dbc; color: #fff; text-align: center; font-size: 16px;">
                        <th style="padding: 15px; font-weight: bold;">#</th>
                        <th style="padding: 15px; font-weight: bold;">Product Name</th>
                        <th style="padding: 15px; font-weight: bold;">Product Description</th>
                        <th style="padding: 15px; font-weight: bold;">Price</th>
                        <th style="padding: 15px; font-weight: bold;">Stock Availability</th>
                    </tr>
                </thead>
                <tbody>
        `;

        products.forEach((product: any, index: number) => {
            const rowColor = index % 2 === 0 ? '#f4f7fa' : '#e6eef3';
            productDetails += `
                <tr style="background-color: ${rowColor}; text-align: center; transition: background-color 0.3s ease;">
                    <td style="padding: 12px; border-top: 1px solid #ddd;">${index + 1}</td>
                    <td style="padding: 12px; border-top: 1px solid #ddd;">${product.name}</td>
                    <td style="padding: 12px; border-top: 1px solid #ddd;">${product.description}</td>
                    <td style="padding: 12px; border-top: 1px solid #ddd; font-weight: bold;">$${product.price.toFixed(2)}</td>
                    <td style="padding: 12px; border-top: 1px solid #ddd;">${product.stock}</td>
                </tr>
            `;
        });

        productDetails += `
                </tbody>
            </table>
        `;
        const mailOptions = {
            to: 'gobanbanu749@gmail.com',
            subject: 'Product List - Every 5 minutes',
            html: productDetails,
        };

        await MailController.sendMail({ body: mailOptions } as any, {} as any);

        console.log('Product email sent successfully.');

    } catch (error) {
        console.error('Error sending product email:', error);
    }
});
