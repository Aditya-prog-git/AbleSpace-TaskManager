const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const mongoose = require("mongoose");

const Task = require("./models/Task");
const Project = require("./models/Project");

const projects = [
  {
    name: "Website Redesign",
    description: "Refresh the marketing website and improve the overall user experience.",
    color: "#8b5cf6"
  },
  {
    name: "Mobile App",
    description: "Prepare the mobile experience for the next product release.",
    color: "#3b82f6"
  },
  {
    name: "Marketing Campaign",
    description: "Plan and launch the Q3 product awareness campaign.",
    color: "#f97316"
  },
  {
    name: "Internal Tools",
    description: "Improve internal workflows and tools used by the product team.",
    color: "#10b981"
  },
  {
    name: "Q3 Product Launch",
    description: "Coordinate the final work required for the Q3 product launch.",
    color: "#ec4899"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    /*
     * We use upsert instead of blindly inserting everything.
     * This means running the seed script again won't create
     * another copy of every project.
     */

    const projectMap = {};

    for (const projectData of projects) {
      const project = await Project.findOneAndUpdate(
        { name: projectData.name },
        projectData,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        }
      );

      projectMap[project.name] = project._id;
    }

    const tasks = [
      {
        title: "Finalize homepage layout",
        description: "Review the final homepage sections and make sure spacing, typography and responsive behavior match the approved design.",
        status: "completed",
        priority: "high",
        dueDate: "2026-08-05",
        project: projectMap["Website Redesign"]
      },
      {
        title: "Update navigation structure",
        description: "Simplify the primary navigation and group related pages under clearer sections.",
        status: "completed",
        priority: "medium",
        dueDate: "2026-08-07",
        project: projectMap["Website Redesign"]
      },
      {
        title: "Improve mobile navigation",
        description: "Implement the responsive navigation drawer and verify it across common mobile breakpoints.",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-08-21",
        project: projectMap["Website Redesign"]
      },
      {
        title: "Review accessibility issues",
        description: "Check keyboard navigation, focus states, contrast and semantic labels across the redesigned pages.",
        status: "todo",
        priority: "medium",
        dueDate: "2026-08-25",
        project: projectMap["Website Redesign"]
      },
      {
        title: "Optimize landing page images",
        description: "Compress large hero and feature images without noticeably reducing visual quality.",
        status: "completed",
        priority: "low",
        dueDate: "2026-08-02",
        project: projectMap["Website Redesign"]
      },
      {
        title: "Add pricing comparison section",
        description: "Build the pricing comparison section and make the table usable on smaller screens.",
        status: "in-progress",
        priority: "medium",
        dueDate: "2026-08-23",
        project: projectMap["Website Redesign"]
      },

      {
        title: "Implement onboarding flow",
        description: "Build the first-time user onboarding screens and connect them to the existing authentication flow.",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-08-22",
        project: projectMap["Mobile App"]
      },
      {
        title: "Add push notification preferences",
        description: "Allow users to control which product notifications they receive.",
        status: "todo",
        priority: "medium",
        dueDate: "2026-08-29",
        project: projectMap["Mobile App"]
      },
      {
        title: "Fix profile image cropping",
        description: "Correct inconsistent avatar cropping when users upload portrait-oriented images.",
        status: "completed",
        priority: "low",
        dueDate: "2026-08-10",
        project: projectMap["Mobile App"]
      },
      {
        title: "Improve offline state handling",
        description: "Show useful feedback when the application loses network connectivity while a user is working.",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-08-27",
        project: projectMap["Mobile App"]
      },
      {
        title: "Prepare app store screenshots",
        description: "Capture and organize the final screenshots required for the upcoming release.",
        status: "todo",
        priority: "low",
        dueDate: "2026-09-02",
        project: projectMap["Mobile App"]
      },

      {
        title: "Finalize campaign messaging",
        description: "Review the final messaging for email, social and landing page campaigns.",
        status: "completed",
        priority: "high",
        dueDate: "2026-08-04",
        project: projectMap["Marketing Campaign"]
      },
      {
        title: "Prepare email campaign",
        description: "Build the segmented email campaign and schedule the first round of messages.",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-08-20",
        project: projectMap["Marketing Campaign"]
      },
      {
        title: "Create social media assets",
        description: "Prepare product announcement graphics and short-form content for the campaign.",
        status: "completed",
        priority: "medium",
        dueDate: "2026-08-09",
        project: projectMap["Marketing Campaign"]
      },
      {
        title: "Review campaign analytics setup",
        description: "Make sure campaign links and conversion events are tracked correctly.",
        status: "in-progress",
        priority: "medium",
        dueDate: "2026-08-24",
        project: projectMap["Marketing Campaign"]
      },
      {
        title: "Draft launch announcement",
        description: "Write the public launch announcement and prepare it for final review.",
        status: "todo",
        priority: "low",
        dueDate: "2026-08-30",
        project: projectMap["Marketing Campaign"]
      },

      {
        title: "Improve task filtering",
        description: "Add more useful filtering options to help the team find tasks quickly.",
        status: "completed",
        priority: "medium",
        dueDate: "2026-07-29",
        project: projectMap["Internal Tools"]
      },
      {
        title: "Clean up old dashboard queries",
        description: "Review slow dashboard queries and remove unnecessary database calls.",
        status: "completed",
        priority: "high",
        dueDate: "2026-08-01",
        project: projectMap["Internal Tools"]
      },
      {
        title: "Add activity history",
        description: "Track important changes made to tasks so users can understand recent activity.",
        status: "in-progress",
        priority: "medium",
        dueDate: "2026-08-26",
        project: projectMap["Internal Tools"]
      },
      {
        title: "Create team productivity report",
        description: "Build a lightweight report showing completed work, outstanding tasks and project progress.",
        status: "todo",
        priority: "medium",
        dueDate: "2026-09-04",
        project: projectMap["Internal Tools"]
      },
      {
        title: "Document internal API endpoints",
        description: "Document the most frequently used internal API endpoints and expected request formats.",
        status: "todo",
        priority: "low",
        dueDate: "2026-09-08",
        project: projectMap["Internal Tools"]
      },

      {
        title: "Complete release checklist",
        description: "Review the complete release checklist and confirm all critical launch items are ready.",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-08-21",
        project: projectMap["Q3 Product Launch"]
      },
      {
        title: "Run regression testing",
        description: "Perform regression testing across authentication, tasks, projects and profile functionality.",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-08-22",
        project: projectMap["Q3 Product Launch"]
      },
      {
        title: "Review production environment",
        description: "Verify environment variables, database access, API configuration and deployment settings.",
        status: "todo",
        priority: "high",
        dueDate: "2026-08-28",
        project: projectMap["Q3 Product Launch"]
      },
      {
        title: "Prepare release notes",
        description: "Summarize the major improvements and fixes included in the upcoming release.",
        status: "todo",
        priority: "medium",
        dueDate: "2026-08-31",
        project: projectMap["Q3 Product Launch"]
      },
      {
        title: "Resolve remaining UI issues",
        description: "Review the application for small visual inconsistencies before the release candidate is approved.",
        status: "in-progress",
        priority: "medium",
        dueDate: "2026-08-24",
        project: projectMap["Q3 Product Launch"]
      },
      {
        title: "QA sign-off",
        description: "Collect final QA approval after all release blockers have been resolved.",
        status: "todo",
        priority: "high",
        dueDate: "2026-09-01",
        project: projectMap["Q3 Product Launch"]
      },

      {
        title: "Update README",
        description: "Document local setup, environment variables, available API endpoints and project structure.",
        status: "completed",
        priority: "low",
        dueDate: "2026-08-06",
        project: null
      },
      {
        title: "Review dependency updates",
        description: "Check outdated dependencies and identify safe updates for the next maintenance cycle.",
        status: "completed",
        priority: "low",
        dueDate: "2026-08-03",
        project: null
      },
      {
        title: "Plan next sprint",
        description: "Review outstanding work and prepare the priorities for the next development sprint.",
        status: "todo",
        priority: "medium",
        dueDate: "2026-08-28",
        project: null
      }
    ];

    /*
     * Remove only tasks with the same titles as our seed data.
     * Your manually created tasks are left untouched.
     */

    const seedTitles = tasks.map((task) => task.title);

    await Task.deleteMany({
      title: { $in: seedTitles }
    });

    await Task.insertMany(tasks);

    console.log("");
    console.log("====================================");
    console.log("AbleSpace dummy data inserted.");
    console.log("====================================");
    console.log(`Projects: ${projects.length}`);
    console.log(`Tasks: ${tasks.length}`);
    console.log("====================================");
    console.log("");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);

    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();