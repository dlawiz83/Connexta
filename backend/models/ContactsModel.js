const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        default: '' 
    },
    company: { 
        type: String, 
        default: '' 
    },
    email: { 
        type: String, 
        default: '' 
    },
    linkedinURI: { 
        type: String, 
        default: '' 
    },
    timeZone: { 
        type: String, 
        default: '' 
    },
    stage: { 
        type: String, 
        enum: ['Prospect', 'Reached Out', 'Chat Scheduled', 'Referred', 'Interviewing'], 
        default: 'Prospect' 
    },
    notes: { 
        type: String, 
        default: '' 
    },
    lastInteractionAt: { 
        type: Date 
    },
    nextActionAt: { 
        type: Date 
    }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactsSchema);
