BEGIN;

INSERT INTO content_items (module,title,slug,summary,body,status,sort_order) VALUES
('services','Custom software','service-custom-software','Business platforms, internal portals, management systems, and customer applications shaped around your workflow.','Discovery and architecture\nSecure full-stack development\nDeployment and support','published',10),
('services','Web development','service-web-development','High-performing websites and e-commerce experiences designed to explain, persuade, and convert.','Corporate and campaign sites\nE-commerce platforms\nSEO and analytics','published',20),
('services','Mobile applications','service-mobile-applications','Reliable Android and iOS products built for local realities and long-term growth.','Cross-platform development\nOffline-friendly experiences\nStore launch support','published',30),
('services','Telecom solutions','service-telecom-solutions','Operational tools and integrations backed by hands-on experience across value-added services.','USSD, SMS and IVR\nAPI and payment integration\nMonitoring and reporting','published',40),
('services','AI & automation','service-ai-automation','Connected workflows and practical AI that reduce repetitive work without losing human oversight.','WhatsApp Business automation\nAI support agents\nWorkflow automation','published',50),
('services','Cloud & technical support','service-cloud-support','Secure deployment, maintenance, performance work, and support that continues after launch.','Cloud infrastructure\nSecurity and audits\nMaintenance agreements','published',60),
('products','GNM','product-gnm','Helping people safely update Gambian contacts during the national numbering migration.','Available','published',10),
('products','MansaMart','product-mansamart','One connected marketplace for customers, merchants, riders, and platform operators.','In development','published',20),
('products','MansaPay','product-mansapay','A considered digital-payment experience designed for simpler, more connected transactions.','Coming soon','published',30),
('products','OceanBrain','product-oceanbrain','Exploring useful AI tools for customer support, business operations, and knowledge access.','Research','published',40),
('industries','Telecommunications','industry-telecommunications','','','published',10),
('industries','Retail & commerce','industry-retail-commerce','','','published',20),
('industries','Financial services','industry-financial-services','','','published',30),
('industries','NGOs & development','industry-ngos-development','','','published',40),
('industries','Education','industry-education','','','published',50),
('industries','Public sector','industry-public-sector','','','published',60),
('industries','Hospitality','industry-hospitality','','','published',70),
('industries','Professional services','industry-professional-services','','','published',80),
('company','Local understanding. Global engineering standards.','company-overview','We know the conditions our clients work in—from connectivity and everyday devices to payment realities and operational pressure. That understanding helps us make better technical decisions.','Why OceanBrown','published',10),
('company','Understand first','company-understand-first','We define the real problem before proposing technology.','','published',20),
('company','Build responsibly','company-build-responsibly','Security, accessibility, and maintainability are part of the work.','','published',30),
('company','Communicate clearly','company-communicate-clearly','You know what is being built and what happens next.','','published',40),
('company','Stay involved','company-stay-involved','Launch is a milestone, not the end of the relationship.','','published',50),
('blog','How to choose the right software for a growing Gambian business','insight-choosing-software','Start with the workflow and the outcome—not the technology trend.','','published',10),
('blog','What reliable digital transformation actually looks like','insight-digital-transformation','Connected tools, clear ownership, trained people, and continuous improvement.','','published',20),
('blog','Turning operational data into decisions teams can act on','insight-operational-data','Better reporting makes incidents, quality, and customer experience visible.','','published',30)
ON CONFLICT (slug) DO NOTHING;

COMMIT;
