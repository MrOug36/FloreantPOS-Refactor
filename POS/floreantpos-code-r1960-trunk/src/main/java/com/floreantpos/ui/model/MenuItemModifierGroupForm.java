/**
 * ************************************************************************
 * * The contents of this file are subject to the MRPL 1.2
 * * (the  "License"),  being   the  Mozilla   Public  License
 * * Version 1.1  with a permitted attribution clause; you may not  use this
 * * file except in compliance with the License. You  may  obtain  a copy of
 * * the License at http://www.floreantpos.org/license.html
 * * Software distributed under the License  is  distributed  on  an "AS IS"
 * * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * * License for the specific  language  governing  rights  and  limitations
 * * under the License.
 * * The Original Code is FLOREANT POS.
 * * The Initial Developer of the Original Code is OROCUBE LLC
 * * All portions are Copyright (C) 2015 OROCUBE LLC
 * * All Rights Reserved.
 * ************************************************************************
 */
/*
 * MenuItemModifierGroupForm.java
 *
 * Created on October 12, 2006, 11:48 PM
 */

package com.floreantpos.ui.model;

import java.util.List;

import com.floreantpos.PosRuntimeException;
import com.floreantpos.model.MenuItemModifierGroup;
import com.floreantpos.model.ModifierGroup;
import com.floreantpos.model.dao.ModifierGroupDAO;
import com.floreantpos.swing.ListComboBoxModel;
import com.floreantpos.ui.BeanEditor;
import com.floreantpos.ui.dialog.POSMessageDialog;

/**
 *
 * @author  mshahriar
 */
public class MenuItemModifierGroupForm extends BeanEditor {

	/** Creates new form MenuItemModifierGroupForm */
	public MenuItemModifierGroupForm() {
		this(new MenuItemModifierGroup());
	}

	public MenuItemModifierGroupForm(MenuItemModifierGroup modifierGroup) {
		initComponents();

		try {
			ModifierGroupDAO dao = new ModifierGroupDAO();
			List<ModifierGroup> groups = dao.findAll();
			cbModifierGroups.setModel(new ListComboBoxModel(groups));
		} catch (Exception e) {
			throw new PosRuntimeException(com.floreantpos.POSConstants.ERROR_MESSAGE);
		}

		setBean(modifierGroup);
	}

	/** This method is called from within the constructor to
	 * initialize the form.
	 * WARNING: Do NOT modify this code. The content of this method is
	 * always regenerated by the Form Editor.
	 */
	// <editor-fold defaultstate="collapsed" desc=" Generated Code ">//GEN-BEGIN:initComponents
	private void initComponents() {
		jLabel1 = new javax.swing.JLabel();
		jLabel2 = new javax.swing.JLabel();
		jLabel3 = new javax.swing.JLabel();
		cbModifierGroups = new javax.swing.JComboBox();
		tfMinQuantity = new javax.swing.JTextField();
		tfMaxQuantity = new javax.swing.JTextField();

		jLabel1.setText(com.floreantpos.POSConstants.MODIFIER_GROUP + ":"); //$NON-NLS-1$

		jLabel2.setText(com.floreantpos.POSConstants.MIN_QUANTITY + ":"); //$NON-NLS-1$

		jLabel3.setText(com.floreantpos.POSConstants.MAX_QUANTITY + ":"); //$NON-NLS-1$

		org.jdesktop.layout.GroupLayout layout = new org.jdesktop.layout.GroupLayout(this);
		this.setLayout(layout);
		layout.setHorizontalGroup(layout.createParallelGroup(org.jdesktop.layout.GroupLayout.LEADING).add(
				layout.createSequentialGroup()
						.addContainerGap()
						.add(layout.createParallelGroup(org.jdesktop.layout.GroupLayout.LEADING).add(jLabel3).add(jLabel2).add(jLabel1))
						.addPreferredGap(org.jdesktop.layout.LayoutStyle.RELATED)
						.add(layout
								.createParallelGroup(org.jdesktop.layout.GroupLayout.LEADING)
								.add(cbModifierGroups, 0, 256, Short.MAX_VALUE)
								.add(layout
										.createParallelGroup(org.jdesktop.layout.GroupLayout.TRAILING, false)
										.add(org.jdesktop.layout.GroupLayout.LEADING, tfMaxQuantity)
										.add(org.jdesktop.layout.GroupLayout.LEADING, tfMinQuantity, org.jdesktop.layout.GroupLayout.DEFAULT_SIZE, 106,
												Short.MAX_VALUE))).addContainerGap()));
		layout.setVerticalGroup(layout.createParallelGroup(org.jdesktop.layout.GroupLayout.LEADING).add(
				layout.createSequentialGroup()
						.addContainerGap()
						.add(layout
								.createParallelGroup(org.jdesktop.layout.GroupLayout.BASELINE)
								.add(jLabel1)
								.add(cbModifierGroups, org.jdesktop.layout.GroupLayout.PREFERRED_SIZE, org.jdesktop.layout.GroupLayout.DEFAULT_SIZE,
										org.jdesktop.layout.GroupLayout.PREFERRED_SIZE))
						.addPreferredGap(org.jdesktop.layout.LayoutStyle.RELATED)
						.add(layout
								.createParallelGroup(org.jdesktop.layout.GroupLayout.BASELINE)
								.add(jLabel2)
								.add(tfMinQuantity, org.jdesktop.layout.GroupLayout.PREFERRED_SIZE, org.jdesktop.layout.GroupLayout.DEFAULT_SIZE,
										org.jdesktop.layout.GroupLayout.PREFERRED_SIZE))
						.addPreferredGap(org.jdesktop.layout.LayoutStyle.RELATED)
						.add(layout
								.createParallelGroup(org.jdesktop.layout.GroupLayout.BASELINE)
								.add(jLabel3)
								.add(tfMaxQuantity, org.jdesktop.layout.GroupLayout.PREFERRED_SIZE, org.jdesktop.layout.GroupLayout.DEFAULT_SIZE,
										org.jdesktop.layout.GroupLayout.PREFERRED_SIZE))
						.addContainerGap(org.jdesktop.layout.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)));
	}// </editor-fold>//GEN-END:initComponents

	// Variables declaration - do not modify//GEN-BEGIN:variables
	private javax.swing.JComboBox cbModifierGroups;
	private javax.swing.JLabel jLabel1;
	private javax.swing.JLabel jLabel2;
	private javax.swing.JLabel jLabel3;
	private javax.swing.JTextField tfMaxQuantity;
	private javax.swing.JTextField tfMinQuantity;

	// End of variables declaration//GEN-END:variables

	@Override
	public boolean save() {
		return updateModel();
	}

	@Override
	protected void updateView() {
		MenuItemModifierGroup modifierGroup = (MenuItemModifierGroup) getBean();
		if (Optional.ofNullable(modifierGroup == null)
			return;

		cbModifierGroups.setSelectedItem(modifierGroup.getModifierGroup());
		tfMinQuantity.setText(String.valueOf(modifierGroup.getMinQuantity()));
		tfMaxQuantity.setText(String.valueOf(modifierGroup.getMaxQuantity()));
	}

	@Override
	protected boolean updateModel() {
		int minQuantity = 0;
		int maxQuantity = 0;

		try {
			minQuantity = Integer.parseInt(tfMinQuantity.getText());
			maxQuantity = Integer.parseInt(tfMaxQuantity.getText());
		} catch (Exception e) {
		}

		ModifierGroup group = (ModifierGroup) cbModifierGroups.getSelectedItem();
		if (Optional.ofNullable(group == null) {
			POSMessageDialog.showError(this, com.floreantpos.POSConstants.MODIFIER_GROUP_REQUIRED);
			return false;
		}
		MenuItemModifierGroup modifierGroup = (MenuItemModifierGroup) getBean();
		modifierGroup.setModifierGroup(group);
		modifierGroup.setMinQuantity(minQuantity);
		modifierGroup.setMaxQuantity(maxQuantity);

		return true;
	}

	@Override
	public String getDisplayText() {
		MenuItemModifierGroup modifierGroup = (MenuItemModifierGroup) getBean();
		if (Optional.ofNullable(modifierGroup.getId() == null) {
			return com.floreantpos.POSConstants.ADD_NEW_MODIFIER_GROUP_IN_MENU_ITEM_;
		}

		return com.floreantpos.POSConstants.EDIT_MODIFIER_GROUP_IN_MENU_ITEM_;
	}

}
