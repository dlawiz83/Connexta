const mongoose = require('mongoose');

const interactionsSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    contactId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Contact', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['dm', 'email', 'call', 'other'], 
        required: true 
    },
    channel: { 
        type: String, 
        default: '' 
    },
    contentSnippet: { 
        type: String, 
        default: '' 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    outcome: { 
        type: String, 
        default: '' 
    },
    nextActionAt: { 
        type: Date 
    }
}, { timestamps: true });

module.exports = mongoose.model('Interaction', interactionsSchema);
