document.addEventListener('DOMContentLoaded', function() {
    // Investment Packages Data
    const investmentPackages = [
        {
            id: 'bronze',
            title: 'Starter (Bronze)',
            icon: 'seedling',
            minInvest: 0,
            maxInvest: 100,
            referralCommission: 5,
            teamCommissions: [3, 1]
        },
        {
            id: 'silver',
            title: 'Silver',
            icon: 'award',
            minInvest: 100,
            maxInvest: 500,
            referralCommission: 7,
            teamCommissions: [5, 2]
        },
        {
            id: 'gold',
            title: 'Gold',
            icon: 'crown',
            minInvest: 500,
            maxInvest: 2000,
            referralCommission: 10,
            teamCommissions: [7, 3, 1]
        },
        {
            id: 'platinum',
            title: 'Platinum',
            icon: 'gem',
            minInvest: 2000,
            maxInvest: 5000,
            referralCommission: 12,
            teamCommissions: [10, 5, 2]
        },
        {
            id: 'diamond',
            title: 'Diamond',
            icon: 'diamond',
            minInvest: 5000,
            maxInvest: null,
            referralCommission: 15,
            teamCommissions: [12, 7, 3, 1]
        }
    ];

    // Team Leadership Data
    const teamLeadership = [
        {
            id: 'team-leader',
            title: 'Team Leader',
            icon: 'users',
            minMembers: 5,
            minVolume: 500,
            badgeText: 'Team Leader',
            commissions: [5, 3]
        },
        {
            id: 'supervisor',
            title: 'Supervisor',
            icon: 'user-tie',
            minMembers: 15,
            minVolume: 2000,
            badgeText: 'Supervisor',
            commissions: [7, 5, 3]
        },
        {
            id: 'director',
            title: 'Director',
            icon: 'chess-king',
            minMembers: 50,
            minVolume: 10000,
            badgeText: 'Director',
            commissions: [10, 7, 5, 3]
        }
    ];

    // Render Investment Packages
    const investmentContainer = document.getElementById('investmentPackages');
    investmentPackages.forEach(pkg => {
        investmentContainer.appendChild(createPackageCard(pkg, 'investment'));
    });

    // Render Team Leadership
    const teamContainer = document.getElementById('teamLeadership');
    teamLeadership.forEach(team => {
        teamContainer.appendChild(createPackageCard(team, 'team'));
    });

    // Create Package Card
    function createPackageCard(data, type) {
        const card = document.createElement('div');
        card.className = `package-card ${data.id}`;
        
        // Package Header
        const header = document.createElement('div');
        header.className = 'package-header';
        
        const icon = document.createElement('div');
        icon.className = 'package-icon';
        icon.innerHTML = `<i class="fas fa-${data.icon}"></i>`;
        
        const title = document.createElement('h2');
        title.className = 'package-title';
        title.textContent = data.title;
        
        header.appendChild(icon);
        header.appendChild(title);
        card.appendChild(header);
        
        if (type === 'investment') {
            // Investment Range
            const rangeGroup = document.createElement('div');
            rangeGroup.className = 'form-group';
            rangeGroup.innerHTML = `
                <label class="form-label">Investment Range ($)</label>
                <div style="display: flex; gap: 10px;">
                    <input type="text" class="form-control" value="${data.minInvest}" placeholder="Min">
                    <input type="text" class="form-control" value="${data.maxInvest || ''}" placeholder="${data.maxInvest ? 'Max' : 'No max'}">
                </div>
            `;
            card.appendChild(rangeGroup);
            
            // Referral Commission
            const referralSection = document.createElement('div');
            referralSection.className = 'commission-section';
            referralSection.innerHTML = `
                <h3 class="commission-title">
                    <i class="fas fa-handshake"></i> Referral Commission
                </h3>
                <div class="form-group">
                    <label class="form-label">Direct Referral (%)</label>
                    <input type="number" class="form-control" value="${data.referralCommission}">
                </div>
            `;
            card.appendChild(referralSection);
            
            // Team Bonus
            const teamSection = document.createElement('div');
            teamSection.className = 'commission-section';
            
            let teamHTML = `
                <h3 class="commission-title">
                    <i class="fas fa-users"></i> Team Bonus
                </h3>
            `;
            
            data.teamCommissions.forEach((commission, index) => {
                teamHTML += `
                    <div class="form-group">
                        <label class="form-label">Level ${index+1} ${index === 0 ? '(Direct)' : ''} (%)</label>
                        <input type="number" class="form-control" value="${commission}">
                    </div>
                `;
            });
            
            teamSection.innerHTML = teamHTML;
            card.appendChild(teamSection);
            
        } else if (type === 'team') {
            // Team Members
            const membersGroup = document.createElement('div');
            membersGroup.className = 'form-group';
            membersGroup.innerHTML = `
                <label class="form-label">Minimum Team Members</label>
                <input type="number" class="form-control" value="${data.minMembers}">
            `;
            card.appendChild(membersGroup);
            
            // Team Volume
            const volumeGroup = document.createElement('div');
            volumeGroup.className = 'form-group';
            volumeGroup.innerHTML = `
                <label class="form-label">Minimum Team Volume ($)</label>
                <input type="number" class="form-control" value="${data.minVolume}">
            `;
            card.appendChild(volumeGroup);
            
            // Badge Text
            const badgeGroup = document.createElement('div');
            badgeGroup.className = 'form-group';
            badgeGroup.innerHTML = `
                <label class="form-label">Badge Display Text</label>
                <input type="text" class="form-control" value="${data.badgeText}">
                <span class="badge-preview team-badge">${data.badgeText}</span>
            `;
            card.appendChild(badgeGroup);
            
            // Commission Rates
            const commissionSection = document.createElement('div');
            commissionSection.className = 'commission-section';
            
            let commissionHTML = `
                <h3 class="commission-title">
                    <i class="fas fa-percentage"></i> Commission Rates
                </h3>
            `;
            
            data.commissions.forEach((commission, index) => {
                commissionHTML += `
                    <div class="form-group">
                        <label class="form-label">Level ${index+1} ${index === 0 ? '(Direct)' : ''} (%)</label>
                        <input type="number" class="form-control" value="${commission}">
                    </div>
                `;
            });
            
            commissionSection.innerHTML = commissionHTML;
            card.appendChild(commissionSection);
        }
        
        // Save Button
        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.textContent = `Save ${data.title}`;
        card.appendChild(saveBtn);
        
        return card;
    }
});