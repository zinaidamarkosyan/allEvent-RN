const path = require('path')

module.exports = {
    resolve: {
        alias: {
            '@/': path.resolve(__dirname, 'src'),
            '@/apis': path.resolve(__dirname, 'src/apis'),
            '@/theme': path.resolve(__dirname, 'src/theme'),
            '@/assets': path.resolve(__dirname, 'src/assets'),
            '@/context': path.resolve(__dirname, 'src/context'),
            '@/screens': path.resolve(__dirname, 'src/screens'),
            '@/helpers': path.resolve(__dirname, 'src/helpers'),
            '@/hooks': path.resolve(__dirname, 'src/hooks/index'),
            '@/components': path.resolve(__dirname, 'src/components'),
            '@/navigation': path.resolve(__dirname, 'src/navigation'),
            "@/Notifications": path.resolve(__dirname, 'src/Notifications')
        },
        extensions: ['.android.js', '.ios.js', '.js'],
    },
}