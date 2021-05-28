import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { RequestWithFile, RequestWithUser, TokenData } from '../interfaces/auth.interface';
import { EquipmentType, BoatType, HebergementType, ServiceType } from '../interfaces/equipments.interface';
import { User } from '../interfaces/users.interface';
import AdminService from '../services/admin.service';
import EquipmentService from '../services/equipments.service';

class AdminController {
  public adminService = new AdminService();
  public equipmentService = new EquipmentService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const skip = Number(req.params.skip) || 0;
      const count = Number(req.params.count) || 5;
      const data = await this.adminService.findUsers(count, skip);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getOverview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.adminService.getOverview();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getReports = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const data = await this.adminService.findReports(userId);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public deleteReport = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const data = await this.adminService.deleteReport(id);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public addEquipmentType = async (req: RequestWithFile, res: Response, next: NextFunction): Promise<void> => {
    try {
      const equipmentData = req.body;
      if (req.file) {
        equipmentData.icon = req.file.path.split('/').splice(1).join('/');
      }
      const equipmentType = await this.equipmentService.addEquipmentType(equipmentData);
      res.status(200).json({ data: equipmentType });
    } catch (error) {
      next(error);
    }
  };

  public addBoatType = async (req: RequestWithFile, res: Response, next: NextFunction): Promise<void> => {
    try {
      const boatData = req.body;
      if (req.file) {
        boatData.icon = req.file.path.split('/').splice(1).join('/');
      }
      const boatType = await this.equipmentService.addBoatType(boatData);
      res.status(200).json({ data: boatType });
    } catch (error) {
      next(error);
    }
  };
  public addServiceType = async (req: RequestWithFile, res: Response, next: NextFunction): Promise<void> => {
    try {
      const serviceData = req.body;
      if (req.file) {
        serviceData.icon = req.file.path.split('/').splice(1).join('/');
      }
      const serviceType = await this.equipmentService.addServiceType(serviceData);
      res.status(200).json({ data: serviceType });
    } catch (error) {
      next(error);
    }
  };

  public addHebergementType = async (req: RequestWithFile, res: Response, next: NextFunction): Promise<void> => {
    try {
      const hebergementData = req.body;
      if (req.file) {
        hebergementData.icon = req.file.path.split('/').splice(1).join('/');
      }
      const hebergementType = await this.equipmentService.addHebergementType(hebergementData);
      res.status(200).json({ data: hebergementType });
    } catch (error) {
      next(error);
    }
  };

  public deleteEquipmentType = async (req: RequestWithFile, res: Response, next: NextFunction): Promise<void> => {
    try {
      const equipmentTypeId: string = req.params.id;
      const equipmentType = await this.equipmentService.deleteEquipmentType(equipmentTypeId);
      res.status(200).json({ data: equipmentType });
    } catch (error) {
      next(error);
    }
  };

  public deleteBoatType = async (req: RequestWithFile, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeId: string = req.params.id;
      const type = await this.equipmentService.deleteBoatType(typeId);
      res.status(200).json({ data: type });
    } catch (error) {
      next(error);
    }
  };

  public deleteHebergementType = async (req: RequestWithFile, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeId: string = req.params.id;
      const type = await this.equipmentService.deleteHebergementType(typeId);
      res.status(200).json({ data: type });
    } catch (error) {
      next(error);
    }
  };

  public deleteServiceType = async (req: RequestWithFile, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeId: string = req.params.id;
      const type = await this.equipmentService.deleteServiceType(typeId);
      res.status(200).json({ data: type });
    } catch (error) {
      next(error);
    }
  };

  public updateUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const activated: boolean = req.body.activated;
      const userId: string = req.params.userId;
      const user: User = await this.adminService.updateUserStatus(userId, activated);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };
}

export default AdminController;
